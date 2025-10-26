// Bounded Context Owner: Community Guild
// Engage (Campus Labs) RSS parser and mapping utilities
// Source example: https://buffalo.campuslabs.com/engage/events.rss

import { XMLParser } from "fast-xml-parser";

export interface EngageRssItemRaw {
  title?: string;
  guid?: string;
  link?: string;
  description?: string; // HTML (CDATA)
  category?: string | string[];
  pubDate?: string;
  start?: string; // namespaced <start xmlns="events">
  end?: string;   // namespaced <end xmlns="events">
  location?: string; // namespaced <location xmlns="events">
  status?: string;   // namespaced <status xmlns="events">
  author?: string;   // "email (Host Name)"
  host?: string | string[]; // namespaced <host xmlns="events">
  enclosure?: { url?: string; length?: string; type?: string } | Array<{ url?: string; length?: string; type?: string }>;
}

export interface EngageEventNormalized {
  id: string; // derived from guid or link
  title: string;
  link: string;
  htmlDescription: string | null;
  textDescription: string | null;
  categories: string[];
  startAt: Date | null;
  endAt: Date | null;
  location: string | null;
  status: string | null;
  hosts: string[];
  imageUrl: string | null;
}

const stripHtml = (html?: string | null): string | null => {
  if (!html) return null;
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim() || null;
};

const toArray = <T>(v: T | T[] | undefined | null): T[] => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);

const toDate = (s?: string | null): Date | null => {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
};

const extractFromHtml = (html?: string | null): { startAt?: Date | null; endAt?: Date | null; location?: string | null; imageUrl?: string | null } => {
  if (!html) return {};
  // Start / end from datetime attributes in dt-start/dt-end elements
  const dtStart = html.match(/class="(?:dt-start|dtstart)[^"]*"[^>]*datetime="([^"]+)"/i)?.[1];
  const dtEnd = html.match(/class="(?:dt-end|dtend)[^"]*"[^>]*datetime="([^"]+)"/i)?.[1];
  const startAt = toDate(dtStart || null);
  const endAt = toDate(dtEnd || null);
  // Location from p-location span
  const locMatch = html.match(/<span[^>]*class="p-location\s+location"[^>]*>([^<]+)<\/span>/i);
  const location = locMatch ? locMatch[1].trim() : undefined;
  // Fallback image from <img src="...">
  const imgMatch = html.match(/<img[^>]*src="([^"]+)"/i);
  const imageUrl = imgMatch ? imgMatch[1] : undefined;
  return { startAt, endAt, location: location ?? null, imageUrl: imageUrl ?? null };
};

const cleanHost = (raw: string): string => {
  const s = (raw || "").toString().trim();
  if (!s) return s;
  // Prefer content in parentheses when author like "email (Host Name)"
  const paren = s.match(/\(([^)]+)\)/);
  if (paren && paren[1]) return paren[1].trim();
  // Drop emails
  if (s.includes("@")) return s.split("@")[0]!.replace(/[<>]/g, "").trim();
  return s;
};

export function parseEngageRssXml(xml: string): EngageEventNormalized[] {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel ?? parsed?.channel;
  if (!channel) return [];
  const rawItems: EngageRssItemRaw[] = toArray(channel.item);

  return rawItems
    .map((item) => {
      const guid = (item.guid || item.link || "").toString();
      const link = (item.link || item.guid || "").toString();
      const idMatch = guid.match(/\/event\/(\d+)/);
      const id = idMatch ? idMatch[1] : guid || link;
      const title = (item.title || "").toString().trim();
      const categories = toArray(item.category).map((c) => c?.toString?.().trim?.()).filter(Boolean) as string[];
      // Primary values from namespaced fields
      let startAt = toDate(item.start || undefined);
      let endAt = toDate(item.end || undefined);
      let location = (item.location || "").toString().trim() || null;
      const status = (item.status || "").toString().trim() || null;
      // Extract best-effort values from description HTML if missing
      const htmlDescription = item.description ? item.description.toString() : null;
      const htmlExtract = extractFromHtml(htmlDescription);
      startAt = startAt || htmlExtract.startAt || null;
      endAt = endAt || htmlExtract.endAt || null;
      location = (location || htmlExtract.location || null) as string | null;

      // Hosts from host elements + author, cleaned. Handle object-shaped nodes from XML parser.
      const hostValues = toArray(item.host).map((h: any) => {
        if (typeof h === 'string') return h;
        if (h && typeof h === 'object') {
          const v = (h['#text'] ?? h.text ?? Object.values(h).find((x) => typeof x === 'string')) as string | undefined;
          return v ?? '';
        }
        return '';
      });
      const hosts = hostValues
        .concat(item.author ? [item.author] : [])
        .map(cleanHost)
        .filter(Boolean);
      const enclosureArr = toArray(item.enclosure);
      const firstImage = enclosureArr.find((e) => (e?.type || "").startsWith("image/"));
      const imageUrl = (firstImage?.url || htmlExtract.imageUrl || null) as string | null;
      const textDescription = stripHtml(htmlDescription);

      return {
        id,
        title,
        link,
        htmlDescription,
        textDescription,
        categories,
        startAt,
        endAt,
        location,
        status,
        hosts,
        imageUrl
      } as EngageEventNormalized;
    })
    .filter((e) => e.title && e.link);
}
