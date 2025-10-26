# HiveLab Operations Runbook

Source specs: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md`, `docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md`, `docs/business/PLATFORM_VERTICAL_SLICES.md`

## Monitoring & Alerts
- **Publish/Deploy failures**: surfaced via `tool.publish` / `tool.deploy` telemetry (console + Firestore `tool_events`). Wire alerting in Sentry/Data Studio for outcome=`failure` spikes.
- **Usage spikes**: track `tool.usage` events; alert HiveLab guild if hourly volume exceeds 3σ baseline.

## Telemetry Pipeline
- Console fallback for local/dev; Firestore `tool_events` in prod (`type` ∈ {`publish`,`deploy`,`usage`,`deployment_reconciled`}).
- Dashboard query starter:
  ```sql
  SELECT type, COUNT(*) AS total
  FROM tool_events
  WHERE recordedAt >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
  GROUP BY type;
  ```

## Data Retention
- Raw `tool_events`: retain 12 months hot; archive to GCS (`gs://hive-ops/hivelab/usage/`) at 6 months; purge after 24 months.
- Aggregated metrics exports kept indefinitely (monthly CSV in the same bucket).

## Export Procedure
1. Run dashboard query for target window.
2. Export CSV → `gs://hive-ops/hivelab/usage/<YYYY-MM>.csv`.
3. Append entry to this runbook with date + link.
4. Notify analytics alias with summary + link.

## Deployment Reconciliation Job
- File: `apps/web/src/server/tools/jobs/reconcile-deployments.job.ts`.
- Schedule: daily 02:00 ET (Cloud Scheduler → Cloud Run).
- Removes deployments when spaces disappear, move campuses, or lose editor leadership.
- Emits `tool.deployment_reconciled` telemetry with removed/remaining space IDs.

## Firestore Configuration
- Rules restrict `tools` collection to campus-scoped reads and editor-only writes.
- Indexes:
  - `tools` by (`campusId`, `visibility`)
  - `tools` by (`status`, `limitedRunEndsAt`)

## Incident Response
1. Check latest `tool.publish` failure events; note actor + stage.
2. Validate Firestore rule logs for denied writes.
3. If reconciliation removed critical deployment, re-deploy via HiveLab UI after confirming a leader/editor still owns the space.

