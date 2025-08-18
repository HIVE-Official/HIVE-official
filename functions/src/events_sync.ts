import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as https from "https";
import * as xml2js from "xml2js";

// RSS feed URL for UB events
const UB_EVENTS_RSS_URL = "https://buffalo.campuslabs.com/engage/events.rss";

/**
 * Cloud Function to sync events from RSS to Firestore
 * Triggered by a schedule (once a week on Monday at 2am)
 */
export const syncEventsFromRSS = functions.pubsub
  .schedule("0 2 * * 1") // Run once a week on Monday at 2:00 AM
  .timeZone("America/New_York")
  .onRun(async () => {
    console.log("Starting weekly RSS event sync...");

    try {
      // Fetch events from RSS feed
      const events = await fetchEventsFromRSS();
      console.log(`Fetched ${events.length} events from RSS`);

      // Get the Firestore database
      const db = admin.firestore();
      const eventsCollection = db.collection("events");

      // First, identify which events need to be updated by checking their source and modification status
      const eventsToUpdate = [];
      const eventsToSkip = [];

      // Check each event in batches to see if it's already in Firestore and if it's been modified
      const processingBatchSize = 10; // Process in small batches to avoid timeouts

      for (let i = 0; i < events.length; i += processingBatchSize) {
        const currentBatch = events.slice(i, Math.min(i + processingBatchSize, events.length));

        // Process each event in this batch
        await Promise.all(currentBatch.map(async (event) => {
          try {
            const docRef = eventsCollection.doc(event.id);
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
              const existingData = docSnapshot.data();

              // Check if this event has been modified by a user
              const isUserModified = existingData.isUserModified === true;
              const source = existingData.source || "external";

              // Only update RSS/external events that haven't been modified
              if (source.includes("external") && !isUserModified) {
                eventsToUpdate.push(event);
                console.log(`Will update RSS event: ${event.title}`);
              } else {
                eventsToSkip.push(event);
                console.log(`Skipping ${isUserModified ? "user-modified" : source} event: ${event.title}`);
              }
            } else {
              // New event, add it to Firestore
              eventsToUpdate.push(event);
              console.log(`Will add new event: ${event.title}`);
            }
          } catch (error) {
            console.error(`Error checking event ${event.id}:`, error);
            // On error, assume it's safe to update
            eventsToUpdate.push(event);
          }
        }));
      }

      console.log(`Will update ${eventsToUpdate.length} events and skip ${eventsToSkip.length} events`);

      // If no events to update, we're done
      if (eventsToUpdate.length === 0) {
        console.log("No events need to be updated in Firestore");

        // Update metadata even if no events were updated
        await db.collection("metadata").doc("rss_sync").set({
          last_sync_timestamp: admin.firestore.FieldValue.serverTimestamp(),
          event_count: 0,
          skipped_count: eventsToSkip.length,
          status: "success_nothing_to_update",
        }, {merge: true});

        return null;
      }

      // Update the events in batches
      await saveEventsToFirestore(eventsToUpdate);

      // Update metadata
      await db.collection("metadata").doc("rss_sync").set({
        last_sync_timestamp: admin.firestore.FieldValue.serverTimestamp(),
        event_count: eventsToUpdate.length,
        skipped_count: eventsToSkip.length,
        status: "success",
      }, {merge: true});

      console.log(`Weekly events sync completed successfully: ${eventsToUpdate.length} updated, ${eventsToSkip.length} skipped`);
      return null;
    } catch (error) {
      console.error("Error syncing events:", error);

      // Log error to Firestore for monitoring
      await admin.firestore().collection("metadata").doc("rss_sync").set({
        last_sync_timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: "error",
        error_message: error.message || "Unknown error",
      }, {merge: true});

      throw error;
    }
  });

/**
 * Fetch events from the RSS feed
 */
async function fetchEventsFromRSS(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    https.get(UB_EVENTS_RSS_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch RSS feed: ${res.statusCode}`));
        return;
      }

      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", async () => {
        try {
          // Parse XML to JS object
          const parser = new xml2js.Parser({explicitArray: false});
          const result = await parser.parseStringPromise(data);

          if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
            reject(new Error("Invalid RSS format"));
            return;
          }

          const items = Array.isArray(result.rss.channel.item) ?
            result.rss.channel.item :
            [result.rss.channel.item];

          // Process and normalize event data
          const events = items.map(processRssItem);
          resolve(events);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Process an RSS item into our event format
 */
function processRssItem(item: any): any {
  // Generate an ID from the guid or title
  const id = item.guid ? String(item.guid).replace(/[^\w-]/g, "-") :
    String(item.title).toLowerCase().replace(/[^\w-]/g, "-");

  // Parse dates
  let startDate = null;
  let endDate = null;

  if (item.pubDate) {
    startDate = new Date(item.pubDate);
    // Default end date to 2 hours after start if not specified
    endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000));
  }

  // Extract more data if available
  const location = extractLocation(item.description || "");
  const organizerName = extractOrganizer(item.description || "", item.title || "");

  return {
    id,
    title: item.title || "Untitled Event",
    description: sanitizeDescription(item.description || ""),
    startDate: startDate ? startDate.toISOString() : new Date().toISOString(),
    endDate: endDate ? endDate.toISOString() : new Date().toISOString(),
    location: location,
    organizerName: organizerName,
    link: item.link || "",
    updatedAt: new Date().toISOString(),
    // Add more fields that your app requires
    synced_at: admin.firestore.FieldValue.serverTimestamp(),
  };
}

/**
 * Extract location from description
 */
function extractLocation(description: string): string {
  // Simple regex to find location patterns
  const locationMatch = description.match(/location[:|\s]+([^<\n]+)/i);
  return locationMatch ? locationMatch[1].trim() : "";
}

/**
 * Extract organizer from description or title
 */
function extractOrganizer(description: string, title: string): string {
  // Try to find organizer in the description
  const organizerMatch = description.match(/(?:hosted|organized|presented) by[:|\s]+([^<\n]+)/i);
  if (organizerMatch) {
    return organizerMatch[1].trim();
  }

  // If not found in description, try from title (e.g. "Organization: Event Name")
  if (title.includes(":")) {
    return title.split(":")[0].trim();
  }

  return "University at Buffalo";
}

/**
 * Clean up HTML and unwanted content from description
 */
function sanitizeDescription(description: string): string {
  return description
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&[^;]+;/g, " ") // Replace HTML entities
    .trim();
}

/**
 * Save events to Firestore in batches, preserving user modifications
 */
async function saveEventsToFirestore(events: any[]): Promise<void> {
  const db = admin.firestore();
  const batchSize = 500; // Firestore batch limit is 500 operations

  console.log(`Saving ${events.length} events to Firestore in batches of ${batchSize}`);

  // Process in batches
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = db.batch();
    const currentBatch = events.slice(i, i + batchSize);

    currentBatch.forEach((event) => {
      const docRef = db.collection("events").doc(event.id);

      // Mark this as an RSS/external event and add sync timestamp
      event.synced_at = admin.firestore.FieldValue.serverTimestamp();
      event.source = "external";
      event.isUserModified = false; // Default to false for RSS events

      // Use merge: true to preserve any fields not in our model
      batch.set(docRef, event, {merge: true});
    });

    await batch.commit();
    console.log(`Committed batch ${i/batchSize + 1} with ${currentBatch.length} events`);
  }
}
