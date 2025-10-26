// Bounded Context Owner: HiveLab Guild
// Canvas shell page for Lab within a Space context (server → client handoff).

import { notFound } from "next/navigation";
import { type HiveLabCanvasShellPayload } from "@hive/ui/server";
import { toolService } from "../../../server/tools/service";
import { buildSamplePayload } from "../_payload";
import LabCanvasClient from "./LabCanvasClient";

interface Props {
  params: { spaceId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function LabCanvasPage({ params, searchParams }: Props) {
  const { spaceId } = params;
  if (!spaceId) return notFound();

  const qp = searchParams ?? {};
  const flag = (key: string): boolean => {
    const v = qp[key];
    if (Array.isArray(v)) return v[0] === "1" || v[0] === "true";
    return v === "1" || v === "true";
  };

  let payload: HiveLabCanvasShellPayload = buildSamplePayload(spaceId, {
    libraryOpen: flag("library"),
    runTestOpen: flag("test"),
    publishOpen: flag("publish"),
    lintDrawerOpen: flag("lints"),
    replacePickerOpen: flag("replace"),
  });

  try {
    const spaceTools = await toolService.listForSpace(spaceId);
    if (spaceTools.length > 0) {
      const realTools = spaceTools.map((snapshot) => {
        const daysRemaining = snapshot.limitedRunEndsAt
          ? Math.max(0, Math.ceil((snapshot.limitedRunEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
          : undefined;
        return {
          id: snapshot.id,
          name: snapshot.name,
          icon: snapshot.icon ?? null,
          status: snapshot.status === "limited_run" ? "limited_run" : "idle",
          limitedRunDaysRemaining: daysRemaining,
          placements: {
            start: snapshot.authoring.placement.start,
            live: snapshot.authoring.placement.live,
            board: snapshot.authoring.placement.board,
            manage: true,
          },
          lastEditedAt: snapshot.updatedAt.toISOString(),
        } as const;
      });

      const mergedTools: HiveLabCanvasShellPayload["tools"] = Array.from(
        (function combine() {
          const m = new Map<string, typeof realTools[number]>();
          realTools.forEach((t: typeof realTools[number]) => m.set(t.id, t));
          payload.tools.forEach((t: typeof payload.tools[number]) => {
            const normalized = { ...t, status: t.status === "limited_run" ? "limited_run" : "idle" } as typeof realTools[number];
            if (!m.has(t.id)) m.set(t.id, normalized as typeof realTools[number]);
          });
          return m;
        })().values()
      );
      payload = { ...payload, tools: mergedTools };
    }
  } catch (error) {
    console.warn("lab.canvas.tools_load_failed", { spaceId, error });
  }

  const toolId = typeof qp["toolId"] === "string" ? (qp["toolId"] as string) : undefined;
  if (toolId && flag("deploy")) {
    try {
      await toolService.deployTool({ toolId, profileId: "profile-jwrhineh", spaceIds: [spaceId] });
    } catch (error) {
      console.warn("lab.canvas.deploy_preview_failed", { toolId, spaceId, error });
    }
  }

  if (toolId) {
    const result = await toolService.getTool(toolId);
    if (result.ok) {
      const snapshot = result.value;
      const daysRemaining = snapshot.limitedRunEndsAt
        ? Math.max(0, Math.ceil((snapshot.limitedRunEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : undefined;
      const nextActive = {
        tool: {
          id: snapshot.id,
          title: snapshot.name,
          description: snapshot.description,
          icon: snapshot.icon ?? null,
          versionLabel: `v${snapshot.version ?? 0}`,
          lastSavedAt: snapshot.updatedAt.toISOString(),
        },
        health: {
          lastRunAt: snapshot.lastTest?.lastRunAt?.toISOString(),
          freshness: snapshot.lastTest?.lastRunAt ? "fresh" : "stale",
          health: snapshot.lastTest?.health ?? "looks_good",
          blockingIssues: snapshot.lastTest?.blockingIssueCount ?? 0,
          runTestHref: `/lab/${spaceId}?test=1&toolId=${encodeURIComponent(snapshot.id)}`,
        },
        summary: {
          projectedCompletions: undefined,
          completionRate: undefined,
          expectedBoardPosts: undefined,
        },
        placements: payload.activeTool?.placements ?? {
          audience: "members",
          placements: {
            start: false,
            live: true,
            board: "off",
            calendar: false,
            dock: false,
          },
          elements: [],
          fieldsUsed: 0,
          hasPII: false,
        },
        limitedRun: snapshot.limitedRunEndsAt
          ? { status: "limited_run", endsAt: snapshot.limitedRunEndsAt.toISOString(), daysRemaining: daysRemaining ?? 0 }
          : undefined,
        deployments: {
          total: snapshot.deployedTo.length,
          items: snapshot.deployedTo.map((sid) => ({ spaceId: sid, spaceName: sid, pinnedVersion: snapshot.deploymentPins[sid] ?? null })),
        },
        lints: { blocks: [], warnings: (snapshot.authoringIssues ?? []).map((i) => ({ id: i.id, message: i.message })) },
        actions: {
          canRunTest: true,
          canPublish: true,
          publishDisabledReason: undefined,
          publishHref: `/lab/${spaceId}?publish=1&toolId=${encodeURIComponent(snapshot.id)}`,
          runTestHref: `/lab/${spaceId}?test=1&toolId=${encodeURIComponent(snapshot.id)}`,
          viewAsStudentHref: `/spaces/${spaceId}`,
        },
        telemetry: { interactionSurface: "tool_home", runTestEvent: "hivelab.run_test_click", publishEvent: "hivelab.publish_click" },
      } as HiveLabCanvasShellPayload["activeTool"];
      const nextTools: HiveLabCanvasShellPayload["tools"] = [
        {
          id: snapshot.id,
          name: snapshot.name,
          icon: snapshot.icon ?? null,
          status: snapshot.status === "limited_run" ? "limited_run" : "idle",
          limitedRunDaysRemaining: daysRemaining,
          placements: { start: snapshot.authoring.placement.start, live: snapshot.authoring.placement.live, board: snapshot.authoring.placement.board, manage: true },
          lastEditedAt: snapshot.updatedAt.toISOString(),
        },
        ...payload.tools.filter((t: typeof payload.tools[number]) => t.id !== snapshot.id),
      ];
      payload = { ...payload, activeTool: nextActive, tools: nextTools };
    }
  }

  return <LabCanvasClient spaceId={spaceId} payload={payload} />;
}
