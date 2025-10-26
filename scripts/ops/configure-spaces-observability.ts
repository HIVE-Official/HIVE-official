// Bounded Context Owner: Community Guild
//
// This script provisions the monitoring + scheduler infrastructure described in
// docs/setup/SPACES_FIRESTORE_SCHEMA.md:142 so ops can track the Spaces board health.
// Run with:
//   GCP_PROJECT_ID=... pnpm ops:spaces-observability
//
// Required env:
//   - GCP_PROJECT_ID: target Firebase/GCP project id.
// Optional env:
//   - GCP_REGION: functions region (default us-central1).
//   - SCHEDULER_LOCATION: Cloud Scheduler location (default same as region).
//   - SCHEDULER_TIME_ZONE: cron timezone (default America/New_York).
//   - SPACE_PIN_SWEEP_SECRET: header secret for pin expiry job.
//   - PIN_SWEEP_FUNCTION_URI: override for Cloud Function URL.
//   - SCHEDULER_SERVICE_ACCOUNT: service account for Cloud Scheduler OIDC token.
//   - MONITORING_NOTIFICATION_CHANNELS: comma-separated alerting channel ids.

import { google, type logging_v2, type monitoring_v3, type cloudscheduler_v1 } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const projectId = process.env.GCP_PROJECT_ID;
if (!projectId) {
  throw new Error("GCP_PROJECT_ID is required (see docs/setup/SPACES_FIRESTORE_SCHEMA.md:142).");
}

const region = process.env.GCP_REGION ?? "us-central1";
const schedulerLocation = process.env.SCHEDULER_LOCATION ?? region;
const timeZone = process.env.SCHEDULER_TIME_ZONE ?? "America/New_York";
const pinSweepSecret = process.env.SPACE_PIN_SWEEP_SECRET ?? "";
const functionUri =
  process.env.PIN_SWEEP_FUNCTION_URI ??
  `https://${region}-${projectId}.cloudfunctions.net/spacesPinsExpiry`;
const schedulerServiceAccount = process.env.SCHEDULER_SERVICE_ACCOUNT ?? "";
const notificationChannels = (process.env.MONITORING_NOTIFICATION_CHANNELS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter((value) => value.length > 0)
  .map((channel) => (channel.startsWith("projects/") ? channel : `projects/${projectId}/notificationChannels/${channel}`));

type ApiError = { readonly code?: number };

const auth = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/logging.admin",
    "https://www.googleapis.com/auth/monitoring",
    "https://www.googleapis.com/auth/monitoring.write",
    "https://www.googleapis.com/auth/cloud-platform.read-only"
  ]
});

const authClient = await auth.getClient();
google.options({ auth: authClient });

const logging = google.logging("v2");
const monitoring = google.monitoring("v3");
const scheduler = google.cloudscheduler("v1");

interface LogMetricSpec {
  readonly id: string;
  readonly description: string;
  readonly filter: string;
  readonly valueExtractor?: string;
  readonly labelExtractors?: Record<string, string>;
  readonly metricDescriptor?: logging_v2.Schema$MetricDescriptor;
  readonly bucketOptions?: logging_v2.Schema$BucketOptions;
}

const logMetricSpecs: readonly LogMetricSpec[] = [
  {
    id: "spaces_posts_create_success",
    description:
      "Counts successful Hive Spaces post creations (spec §7.1). Used for throughput dashboards and error rate baseline.",
    filter: 'jsonPayload.metric="spaces.posts.create.success"',
    labelExtractors: {
      space_id: 'EXTRACT(jsonPayload.labels.spaceId)',
      pinned: 'EXTRACT(jsonPayload.labels.pinned)',
      audience: 'EXTRACT(jsonPayload.labels.audience)',
      origin: 'EXTRACT(jsonPayload.labels.origin)'
    },
    metricDescriptor: {
      metricKind: "DELTA",
      valueType: "INT64",
      unit: "1",
      labels: [
        { key: "space_id", valueType: "STRING", description: "Space identifier" },
        { key: "pinned", valueType: "STRING", description: "Whether the post is pinned" },
        { key: "audience", valueType: "STRING", description: "Audience for the post" },
        { key: "origin", valueType: "STRING", description: "Origin channel" }
      ],
      displayName: "Spaces Post Create Success"
    }
  },
  {
    id: "spaces_posts_create_failure",
    description:
      "Counts failed Hive Spaces post creations to support error-rate alerting (spec §7.1).",
    filter: 'jsonPayload.metric="spaces.posts.create.failure"',
    labelExtractors: {
      space_id: 'EXTRACT(jsonPayload.labels.spaceId)',
      reason: 'EXTRACT(jsonPayload.labels.reason)'
    },
    metricDescriptor: {
      metricKind: "DELTA",
      valueType: "INT64",
      unit: "1",
      labels: [
        { key: "space_id", valueType: "STRING", description: "Space identifier" },
        { key: "reason", valueType: "STRING", description: "Failure reason" }
      ],
      displayName: "Spaces Post Create Failure"
    }
  },
  {
    id: "spaces_posts_list_latency_ms",
    description:
      "Distribution of board list latency for Hive Spaces (spec §7.1). Drives latency P95 alerting.",
    filter: 'jsonPayload.metric="spaces.posts.list.latency_ms"',
    valueExtractor: "EXTRACT(jsonPayload.value)",
    labelExtractors: {
      space_id: 'EXTRACT(jsonPayload.labels.spaceId)',
      surface: 'EXTRACT(jsonPayload.labels.surface)'
    },
    metricDescriptor: {
      metricKind: "DELTA",
      valueType: "DISTRIBUTION",
      unit: "ms",
      labels: [
        { key: "space_id", valueType: "STRING", description: "Space identifier" },
        { key: "surface", valueType: "STRING", description: "Surface (space_board/campus_feed)" }
      ],
      displayName: "Spaces Post List Latency"
    },
    bucketOptions: {
      exponentialBuckets: {
        scale: 50,
        growthFactor: 2,
        numFiniteBuckets: 20
      }
    }
  },
  {
    id: "spaces_posts_pins_expired",
    description:
      "Counts posts automatically unpinned by the expiry sweep to track governance health (spec §7.2).",
    filter: 'jsonPayload.metric="spaces.posts.pins.expired"',
    labelExtractors: {
      space_id: 'EXTRACT(jsonPayload.labels.spaceId)'
    },
    metricDescriptor: {
      metricKind: "DELTA",
      valueType: "INT64",
      unit: "1",
      labels: [
        { key: "space_id", valueType: "STRING", description: "Space identifier" }
      ],
      displayName: "Spaces Pins Expired"
    }
  }
];

const ensureLogMetric = async (spec: LogMetricSpec) => {
  const metricName = `projects/${projectId}/metrics/${spec.id}`;
  try {
    await logging.projects.metrics.get({ metricName });
    console.info(`[observability] log metric ${spec.id} already exists`);
    return;
  } catch (error) {
    const status = (error as ApiError).code;
    if (status && status !== 404) {
      throw error;
    }
  }

  const requestBody: logging_v2.Schema$LogMetric = {
    name: spec.id,
    description: spec.description,
    filter: spec.filter,
    valueExtractor: spec.valueExtractor,
    labelExtractors: spec.labelExtractors,
    metricDescriptor: spec.metricDescriptor,
    bucketOptions: spec.bucketOptions
  };

  await logging.projects.metrics.create({
    parent: `projects/${projectId}`,
    requestBody
  });
  console.info(`[observability] created log metric ${spec.id}`);
};

interface AlertPolicySpec {
  readonly displayName: string;
  readonly documentation: string;
  readonly query: string;
  readonly threshold: number;
  readonly durationSeconds: number;
}

const alertSpecs: readonly AlertPolicySpec[] = [
  {
    displayName: "Spaces post create error rate >2% (5m)",
    documentation:
      "Triggers when Hive Spaces post creation failures exceed 2% of attempts in a 5 minute window. Based on docs/setup/SPACES_FIRESTORE_SCHEMA.md:146.",
    query: `
fetch logging.googleapis.com/user/spaces_posts_create_failure
| align rate(5m)
| group_by [], [value_failure: sum(value)]
join
fetch logging.googleapis.com/user/spaces_posts_create_success
| align rate(5m)
| group_by [], [value_success: sum(value)]
| value(value_failure) / clamp(value(value_failure) + value(value_success), 1, +inf)
`,
    threshold: 0.02,
    durationSeconds: 300
  },
  {
    displayName: "Spaces board latency P95 >1500ms (5m)",
    documentation:
      "Alerts when the 95th percentile latency for listing a Hive Space board exceeds 1500ms over a 5 minute window (docs/setup/SPACES_FIRESTORE_SCHEMA.md:146).",
    query: `
fetch logging.googleapis.com/user/spaces_posts_list_latency_ms
| align percentile(5m, 95)
| value
`,
    threshold: 1500,
    durationSeconds: 300
  }
];

const ensureAlertPolicy = async (spec: AlertPolicySpec) => {
  const parent = `projects/${projectId}`;
  const existingPolicies = await monitoring.projects.alertPolicies.list({
    name: parent,
    filter: `displayName="${spec.displayName}"`
  });

  if ((existingPolicies.data.alertPolicies ?? []).length > 0) {
    console.info(`[observability] alert policy "${spec.displayName}" already exists`);
    return;
  }

  const condition: monitoring_v3.Schema$Condition = {
    displayName: spec.displayName,
    conditionMonitoringQueryLanguage: {
      query: spec.query.trim(),
      duration: `${spec.durationSeconds}s`,
      trigger: { count: 1 },
      thresholdValue: spec.threshold,
      comparison: "COMPARISON_GT"
    }
  };

  await monitoring.projects.alertPolicies.create({
    name: parent,
    requestBody: {
      displayName: spec.displayName,
      documentation: {
        content: spec.documentation,
        mimeType: "text/markdown"
      },
      combiner: "OR",
      notificationChannels: notificationChannels.length > 0 ? notificationChannels : undefined,
      enabled: true,
      conditions: [condition],
      userLabels: {
        slice: "spaces",
        owner: "community_guild"
      }
    }
  });

  console.info(`[observability] created alert policy "${spec.displayName}"`);
};

interface SchedulerJobSpec {
  readonly jobId: string;
  readonly schedule: string;
  readonly description: string;
}

const schedulerSpec: SchedulerJobSpec = {
  jobId: "spaces-pins-expiry",
  schedule: "*/5 * * * *",
  description:
    "Calls the spacesPinsExpiry Cloud Function to unpin expired posts per docs/setup/SPACES_FIRESTORE_SCHEMA.md:150."
};

const ensureSchedulerJob = async (spec: SchedulerJobSpec) => {
  const name = `projects/${projectId}/locations/${schedulerLocation}/jobs/${spec.jobId}`;
  const body = Buffer.from(JSON.stringify({ trigger: "scheduler" }), "utf8").toString("base64");

  const httpTarget: cloudscheduler_v1.Schema$HttpTarget = {
    uri: functionUri,
    httpMethod: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      ...(pinSweepSecret ? { "x-hive-cron-secret": pinSweepSecret } : {})
    }
  };

  if (schedulerServiceAccount) {
    httpTarget.oidcToken = {
      serviceAccountEmail: schedulerServiceAccount,
      audience: functionUri
    };
  }

  const payload: cloudscheduler_v1.Schema$Job = {
    name,
    description: spec.description,
    schedule: spec.schedule,
    timeZone,
    httpTarget
  };

  try {
    await scheduler.projects.locations.jobs.get({ name });
    await scheduler.projects.locations.jobs.patch({
      name,
      updateMask: "schedule,timeZone,httpTarget,description",
      requestBody: payload
    });
    console.info(`[observability] updated scheduler job ${spec.jobId}`);
  } catch (error) {
    const status = (error as ApiError).code;
    if (status && status !== 404) {
      throw error;
    }

    await scheduler.projects.locations.jobs.create({
      parent: `projects/${projectId}/locations/${schedulerLocation}`,
      requestBody: payload
    });
    console.info(`[observability] created scheduler job ${spec.jobId}`);
  }
};

const run = async () => {
  for (const spec of logMetricSpecs) {
    await ensureLogMetric(spec);
  }

  for (const spec of alertSpecs) {
    await ensureAlertPolicy(spec);
  }

  await ensureSchedulerJob(schedulerSpec);

  console.info("[observability] Hive Spaces monitoring + scheduler configuration complete");
};

await run();
