// Bounded Context Owner: HiveLab Guild
// Canonical Elements catalog for HiveLab v1 (ref: docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md)
import type { ElementCatalog, ElementDefinition } from "./contracts";

export const elementCatalog: ElementCatalog = [
  // Foundation — Gather, Collect, Track
  {
    id: "quick_form",
    name: "Quick Form",
    category: "Gather & RSVP",
    purpose: "Capture short inputs like sign-ups, interests, or micro-feedback.",
    slots: ["post", "event_before"],
    writes: ["form_submission"],
    maxFields: 5,
    guardrails: ["pii_guard", "file_size_cap"],
    outputs: ["CSV"],
    synonyms: ["intake", "form", "survey"],
    native: "Student Org",
    config: { fieldLimit: 5 },
    pii: false
  },
  {
    id: "poll_rank",
    name: "Poll / Rank",
    category: "Decide",
    purpose: "Let members vote (single/multi) or prioritize options.",
    slots: ["post", "event_during"],
    writes: ["vote"],
    maxFields: 1,
    guardrails: ["poll_lock"],
    outputs: ["Bars", "CSV"],
    synonyms: ["poll", "rank", "prioritize"],
    config: { lockAfterFirstVote: true },
    pii: false
  },
  {
    id: "file_upload",
    name: "File Upload",
    category: "Media & Files",
    purpose: "Collect one file per submission (waiver, receipt, proof).",
    slots: ["post", "event_before"],
    writes: ["file_metadata"],
    maxFields: 1,
    guardrails: ["safe_scan", "retention"],
    outputs: ["ZIP", "Links"],
    synonyms: ["waiver", "receipt"],
    config: { allowImages: true, requireAltText: false },
    pii: true
  },
  {
    id: "acknowledge_policy",
    name: "Acknowledge (Policy/Step)",
    category: "Care & Safety",
    purpose: "Record lightweight attestation to policies or required steps.",
    slots: ["post", "event_before"],
    writes: ["acknowledge"],
    maxFields: 1,
    guardrails: ["copy_required"],
    outputs: ["CSV", "PDF"],
    capabilities: ["leaders"],
    native: "Univ Org",
    pii: false
  },
  {
    id: "slots_shifts",
    name: "Slots / Shifts",
    category: "Match & Team",
    purpose: "Book appointments or staff shift roles with caps and waitlists.",
    slots: ["event_before", "event_during", "post"],
    writes: ["slot_claim"],
    maxFields: 2,
    guardrails: ["conflict_check", "weekly_cap"],
    outputs: ["CSV", "ICS"],
    config: { waitlist: true, reminders: ["24h", "start"] },
    extends: "events",
    pii: false
  },
  {
    id: "check_in_pro",
    name: "Check-In Pro",
    category: "Care & Safety",
    purpose: "Track attendance with optional tap-out and multi-station support.",
    slots: ["event_during"],
    writes: ["checkin", "checkout"],
    maxFields: 1,
    guardrails: ["station_limit", "per_day_quota"],
    outputs: ["Live count", "CSV"],
    config: { stationCount: 2 },
    extends: "events",
    pii: true
  },
  {
    id: "counter_scoreboard",
    name: "Counter / Scoreboard",
    category: "Track & Progress",
    purpose: "Track +1 contributions, streaks, or progress toward a goal.",
    slots: ["post", "event_during"],
    writes: ["counter_tick"],
    maxFields: 1,
    guardrails: ["tap_throttle", "undo_window"],
    outputs: ["CSV", "Meters"],
    pii: false
  },
  {
    id: "kudos_shoutout",
    name: "Kudos / Shoutout",
    category: "Care & Safety",
    purpose: "Celebrate members with optional weekly roll-ups.",
    slots: ["post"],
    writes: ["kudos"],
    maxFields: 1,
    guardrails: ["moderation", "reporting"],
    outputs: ["Roll-up Post"],
    pii: false
  },
  {
    id: "tasks_lite",
    name: "Tasks (Lite)",
    category: "Track & Progress",
    purpose: "Manage checklists and reminders without heavy project tooling.",
    slots: ["post"],
    writes: ["task"],
    maxFields: 4,
    guardrails: ["column_cap", "digest_bundle"],
    outputs: ["CSV"],
    config: { columns: 3 },
    pii: false
  },
  {
    id: "labels_members",
    name: "Labels (Members)",
    category: "Invite & Share",
    purpose: "Create roster chips and segmentation labels with optional self-select.",
    slots: ["members_badge"],
    writes: ["label", "member_label"],
    maxFields: 3,
    guardrails: ["label_cap"],
    capabilities: ["leaders", "ra"],
    pii: false
  },
  {
    id: "pairing_matchmaker",
    name: "Pairing / Matchmaker",
    category: "Match & Team",
    purpose: "Pair members or form small teams with fairness and cooldown rules.",
    slots: ["post"],
    writes: ["pairing"],
    maxFields: 2,
    guardrails: ["fairness", "cooldown"],
    pii: false
  },
  {
    id: "equipment_checkout",
    name: "Equipment Checkout",
    category: "Media & Files",
    purpose: "Lend items like gear or games with due windows and reminders.",
    slots: ["post"],
    writes: ["checkout(equipment)", "checkin(equipment)"],
    maxFields: 2,
    guardrails: ["inventory_cap", "reminder"],
    capabilities: ["leaders", "ra"],
    pii: true
  },
  {
    id: "invite_link_capped",
    name: "InviteLink (capped/tracked)",
    category: "Invite & Share",
    purpose: "Generate controlled invite links with attribution and quotas.",
    slots: ["post"],
    writes: ["invite_use"],
    maxFields: 1,
    guardrails: ["cooldown", "token_audit"],
    pii: false
  },
  {
    id: "cohost_handshake",
    name: "Co-host Handshake",
    category: "Invite & Share",
    purpose: "Request and accept co-hosting between spaces with mirrored posts.",
    slots: ["event_before"],
    writes: ["cohost_request", "cohost_accept"],
    maxFields: 1,
    guardrails: ["mutual_consent"],
    extends: "events",
    pii: false
  },
  {
    id: "photo_drop",
    name: "PhotoDrop / Gallery",
    category: "Media & Files",
    purpose: "Collect member photos into a curated grid with moderation flow.",
    slots: ["event_during", "event_after", "post"],
    writes: ["media_upload"],
    maxFields: 1,
    guardrails: ["safe_scan", "report_pipeline"],
    outputs: ["Gallery", "Recap Picks"],
    extends: "events",
    pii: true
  },
  {
    id: "resource_list",
    name: "Resource List / Brand Kit",
    category: "Gather & RSVP",
    purpose: "Share curated links or files with visibility controls.",
    slots: ["post"],
    writes: ["kb_article"],
    maxFields: 4,
    guardrails: ["safe_link"],
    pii: false
  },
  {
    id: "heads_up_announcement",
    name: "Heads-Up (TTL Announcement)",
    category: "Invite & Share",
    purpose: "Send expiring announcements that respect digest rules.",
    slots: ["post", "digest_line"],
    writes: ["announcement"],
    maxFields: 1,
    guardrails: ["ttl_required", "digest_bundle"],
    outputs: ["Reach stats"],
    config: { requiresTTL: true },
    pii: false
  },
  {
    id: "knowledge_base_faq",
    name: "Knowledge Base / FAQ",
    category: "Invite & Share",
    purpose: "Publish help articles and index them for search.",
    slots: ["post"],
    writes: ["kb_article"],
    maxFields: 3,
    guardrails: ["versioning", "safe_link"],
    outputs: ["Search hits"],
    pii: false
  },

  // Event Extensions
  {
    id: "advisor_approver_checklist",
    name: "Advisor/Approver Checklist",
    category: "Care & Safety",
    purpose: "Ensure room, AV, contracts, and accessibility checks are complete before publishing an event.",
    slots: ["event_before"],
    writes: ["acknowledge", "file_metadata"],
    guardrails: ["required_to_publish"],
    outputs: ["PDF packet"],
    capabilities: ["leaders", "staff"],
    extends: "events",
    pii: true
  },
  {
    id: "policy_acknowledge_event",
    name: "Policy Acknowledge (Event)",
    category: "Care & Safety",
    purpose: "Collect policy agreements tied to a specific event (food, photo, accessibility).",
    slots: ["event_before"],
    writes: ["acknowledge"],
    guardrails: ["policy_template"],
    extends: "events",
    pii: false
  },
  {
    id: "live_counter_pulse",
    name: "Live Counter / Pulse",
    category: "Track & Progress",
    purpose: "Show real-time pulse during an event (attendance, check-ins).",
    slots: ["event_during"],
    writes: ["counter_tick"],
    guardrails: ["live_area_required"],
    extends: "events",
    pii: false
  },
  {
    id: "transit_eta_panel",
    name: "Transit ETA",
    category: "Place & Logistics",
    purpose: "Display live arrival times for key stops near the event.",
    slots: ["calendar_badge", "event_before", "anchor_timetable"],
    writes: [],
    guardrails: ["proxy_cache"],
    outputs: ["ETA chip"],
    extends: "events",
    pii: false
  },
  {
    id: "weather_risk_flags",
    name: "Weather Risk Flags",
    category: "Care & Safety",
    purpose: "Warn leaders about precipitation, wind, or heat risks tied to events.",
    slots: ["calendar_badge", "event_before"],
    writes: [],
    guardrails: ["source_allowlist"],
    extends: "events",
    pii: false
  },
  {
    id: "room_info_wayfinding",
    name: "Room Info & Wayfinding",
    category: "Place & Logistics",
    purpose: "Surface capacity, AV notes, accessibility tips, and maps for event rooms.",
    slots: ["calendar_panel"],
    writes: [],
    guardrails: ["curated_dataset"],
    extends: "events",
    pii: false
  },

  // University Org / Service
  {
    id: "service_request_intake",
    name: "Service Request Intake",
    category: "Care & Safety",
    purpose: "File structured tickets with type, priority, assignee, and attachments.",
    slots: ["post"],
    writes: ["service_request", "file_metadata"],
    guardrails: ["sla_target"],
    outputs: ["CSV", "PDF"],
    capabilities: ["staff"],
    pii: true
  },
  {
    id: "walk_in_queue",
    name: "Walk-in Queue / Ticket",
    category: "Care & Safety",
    purpose: "Manage lobby or desk queues with categories, prefixes, and max length.",
    slots: ["post"],
    writes: ["queue_join", "queue_serve"],
    guardrails: ["max_length", "cooldown"],
    outputs: ["Now serving", "CSV"],
    pii: true
  },
  {
    id: "case_file_lite",
    name: "Case File (Lite)",
    category: "Care & Safety",
    purpose: "Wrap related tasks, notes, and files into a lightweight case.",
    slots: ["post"],
    writes: ["case", "task", "file_metadata"],
    guardrails: ["redaction_defaults"],
    outputs: ["Case PDF"],
    pii: true
  },
  {
    id: "referral_space",
    name: "Referral (Space→Space)",
    category: "Care & Safety",
    purpose: "Send warm handoffs between spaces with due dates and reasons.",
    slots: ["post"],
    writes: ["referral"],
    outputs: ["CSV", "Link card"],
    guardrails: ["visibility"],
    pii: true
  },
  {
    id: "training_completion_tracker",
    name: "Training Completion Tracker",
    category: "Track & Progress",
    purpose: "Track modules, due windows, and proof uploads for trainings.",
    slots: ["post"],
    writes: ["training_complete", "file_metadata"],
    outputs: ["CSV", "PDF"],
    guardrails: ["proof_required"],
    pii: true
  },
  {
    id: "program_series_manager",
    name: "Program Series Manager",
    category: "Track & Progress",
    purpose: "Manage multi-session programs with enrollments and completion percent.",
    slots: ["post"],
    writes: ["program_enroll", "program_step_complete"],
    outputs: ["CSV", "PDF"],
    guardrails: ["reflection_prompt"],
    pii: true
  },
  {
    id: "brand_a11y_review_gate",
    name: "Brand/A11y Review Gate",
    category: "Care & Safety",
    purpose: "Force pre-publish compliance review for major communications.",
    slots: ["post"],
    writes: ["acknowledge"],
    guardrails: ["required_to_publish"],
    outputs: ["Pass/Fail PDF"],
    capabilities: ["staff"],
    pii: false
  },
  {
    id: "announcement_targeted",
    name: "Announcement (Targeted)",
    category: "Invite & Share",
    purpose: "Send targeted expiring communications with label filters.",
    slots: ["post", "digest_line"],
    writes: ["announcement"],
    guardrails: ["ttl_required", "label_filter"],
    outputs: ["Reach stats"],
    capabilities: ["staff", "leaders"],
    pii: false
  },
  {
    id: "compliance_auto_pack",
    name: "Compliance/Recognition Auto-Pack",
    category: "Care & Safety",
    purpose: "Bundle attendance, acknowledgements, and completion records for auditors.",
    slots: ["post"],
    writes: [],
    outputs: ["ZIP (CSV/PDF)"],
    guardrails: ["export_scope"],
    pii: true
  },

  // Greek Life
  {
    id: "risk_checklist",
    name: "Risk Checklist",
    category: "Care & Safety",
    purpose: "Collect social/formal risk details (security, capacity, neighbors).",
    slots: ["event_before"],
    writes: ["risk_ack", "file_metadata"],
    guardrails: ["compliance_required"],
    outputs: ["Risk PDF"],
    capabilities: ["leaders", "staff"],
    extends: "events",
    pii: true
  },
  {
    id: "sober_monitor_assignment",
    name: "Sober Monitor Assignment",
    category: "Care & Safety",
    purpose: "Schedule required coverage blocks and training acknowledgements.",
    slots: ["event_before", "event_during"],
    writes: ["slot_claim"],
    guardrails: ["coverage_meter"],
    extends: "events",
    pii: true
  },
  {
    id: "guest_list_manager",
    name: "Guest List Manager",
    category: "Invite & Share",
    purpose: "Manage invites, caps, ratios, and door check-ins.",
    slots: ["event_before", "event_during"],
    writes: ["guest_invite", "guest_checkin", "ratio_snapshot"],
    guardrails: ["ratio_guard", "cap_guard"],
    outputs: ["CSV", "Meters"],
    extends: "events",
    pii: true
  },
  {
    id: "capacity_control",
    name: "Capacity Control",
    category: "Care & Safety",
    purpose: "Tie live capacity to check-ins with door open/close controls.",
    slots: ["event_during"],
    writes: ["capacity_event"],
    guardrails: ["headcount_cap"],
    outputs: ["Cap history"],
    extends: "events",
    pii: false
  },
  {
    id: "incident_intake",
    name: "Incident Intake",
    category: "Care & Safety",
    purpose: "Capture structured incidents, photos, severity, and escalations.",
    slots: ["event_during", "post"],
    writes: ["incident", "file_metadata", "escalation"],
    guardrails: ["privacy", "escalation"],
    outputs: ["Incident PDF"],
    pii: true
  },
  {
    id: "pnm_intake",
    name: "PNM Intake",
    category: "Recruitment",
    purpose: "Track potential new member forms and profiles.",
    slots: ["post"],
    writes: ["pnm"],
    guardrails: ["pii_guard"],
    outputs: ["CSV"],
    pii: true
  },
  {
    id: "pnm_rating",
    name: "PNM Rating",
    category: "Recruitment",
    purpose: "Collect ratings and notes during recruitment rounds.",
    slots: ["post"],
    writes: ["pnm_rating"],
    guardrails: ["bias_guard"],
    outputs: ["CSV"],
    pii: true
  },
  {
    id: "bid_management",
    name: "Bid Management",
    category: "Recruitment",
    purpose: "Log bids, statuses, and matching decisions.",
    slots: ["post"],
    writes: ["bid"],
    guardrails: ["compliance_required"],
    pii: true
  },
  {
    id: "standards_hearing",
    name: "Standards / Hearing",
    category: "Care & Safety",
    purpose: "Track hearings, sanctions, and follow-up steps.",
    slots: ["post"],
    writes: ["hearing", "sanction"],
    guardrails: ["confidential"],
    pii: true
  },

  // Residential life
  {
    id: "roommate_suite_pact",
    name: "Roommate / Suite Pact",
    category: "Care & Safety",
    purpose: "Document shared expectations with signatures.",
    slots: ["post"],
    writes: ["acknowledge"],
    outputs: ["PDF"],
    capabilities: ["ra"],
    pii: true
  },
  {
    id: "fix_it_ticket",
    name: "Fix-It Ticket",
    category: "Care & Safety",
    purpose: "Submit maintenance issues with photos into facilities queue.",
    slots: ["post"],
    writes: ["service_request", "file_metadata"],
    outputs: ["PDF", "Email"],
    capabilities: ["ra", "residents"],
    pii: true
  },
  {
    id: "create_sub_space",
    name: "Create Sub-Space",
    category: "Invite & Share",
    purpose: "Spin up managed sub-communities with TTL.",
    slots: ["post"],
    writes: ["sub_space", "sub_space_membership"],
    guardrails: ["ttl_required"],
    capabilities: ["ra"],
    pii: false
  },
  {
    id: "label_manager_ra",
    name: "Label Manager (RA)",
    category: "Invite & Share",
    purpose: "Create wing/LLC labels with self-select toggles.",
    slots: ["members_badge"],
    writes: ["label", "member_label"],
    guardrails: ["label_cap"],
    capabilities: ["ra"],
    pii: false
  },
  {
    id: "room_lounge_booking",
    name: "Room/Lounge Booking",
    category: "Place & Logistics",
    purpose: "Prevent conflicts for common rooms with approvals and ICS feeds.",
    slots: ["post"],
    writes: ["slot_claim"],
    guardrails: ["conflict_prevent"],
    outputs: ["ICS"],
    capabilities: ["ra"],
    pii: true
  },
  {
    id: "community_challenge",
    name: "Community Challenge",
    category: "Track & Progress",
    purpose: "Run building-wide counter campaigns.",
    slots: ["post"],
    writes: ["counter_tick"],
    guardrails: ["campaign_duration"],
    outputs: ["Leaderboard", "CSV"],
    pii: false
  },
  {
    id: "host_signup",
    name: "Host Signup",
    category: "Invite & Share",
    purpose: "Allow residents to propose activities that RAs approve and scaffold.",
    slots: ["post"],
    writes: ["form_submission"],
    guardrails: ["approval_required"],
    capabilities: ["ra"],
    pii: true
  },
  {
    id: "quiet_pulse",
    name: "Quiet Pulse",
    category: "Care & Safety",
    purpose: "Residents tap \"too loud\" to feed an RA heatmap.",
    slots: ["post", "anchor_timetable"],
    writes: ["pulse"],
    guardrails: ["rate_limit"],
    outputs: ["Heatmap"],
    pii: false
  },
  {
    id: "fix_it_bundle_panel",
    name: "Fix-It Bundle / Panel Picker",
    category: "Care & Safety",
    purpose: "Compile maintenance panels and export bundles for facilities.",
    slots: ["post"],
    writes: ["space_panel_config"],
    guardrails: ["export_scope"],
    capabilities: ["ra"],
    pii: true
  },
  {
    id: "resource_exchange",
    name: "Resource Exchange",
    category: "Invite & Share",
    purpose: "Managed give/take free items with RA moderation and expiry.",
    slots: ["post"],
    writes: ["service_request"],
    guardrails: ["moderation", "expiry"],
    capabilities: ["ra"],
    pii: false
  },

  // Classes & Personal Fit
  {
    id: "add_class",
    name: "Add Class",
    category: "Track & Progress",
    purpose: "Track recurring class meetings for Fit recommendations.",
    slots: ["profile_overlay"],
    writes: ["class_meeting", "class_membership"],
    guardrails: ["calendar_sync"],
    pii: true
  },
  {
    id: "busy_block_builder",
    name: "Busy Block Builder",
    category: "Track & Progress",
    purpose: "Add lab/job/study/commute time blocks to personal schedule.",
    slots: ["profile_overlay"],
    writes: ["busy_block"],
    pii: false
  },
  {
    id: "fit_settings",
    name: "Fit Settings",
    category: "Track & Progress",
    purpose: "Adjust buffers, walking speed, and preferences for Fit.",
    slots: ["profile_overlay"],
    writes: ["fit_prefs"],
    pii: false
  },
  {
    id: "schedule_aware_rsvp",
    name: "Schedule-Aware RSVP / Soft Hold",
    category: "Gather & RSVP",
    purpose: "Offer one-tap RSVP when an event fits and hold otherwise.",
    slots: ["calendar_badge", "calendar_panel"],
    writes: ["soft_hold"],
    guardrails: ["fit_required"],
    extends: "events",
    pii: false
  },
  {
    id: "flex_block_generator",
    name: "Flex Block Generator",
    category: "Track & Progress",
    purpose: "Create free windows to open availability for suggestions.",
    slots: ["profile_overlay"],
    writes: ["free_window"],
    pii: false
  },
  {
    id: "conflict_nudger",
    name: "Conflict Nudger",
    category: "Track & Progress",
    purpose: "Suggest near-alternative times when a conflict appears.",
    slots: ["calendar_panel"],
    writes: [],
    guardrails: ["suggestion_only"],
    extends: "events",
    pii: false
  },

  // External Info Panels
  {
    id: "dining_menus",
    name: "Dining Menus & Hours",
    category: "Place & Logistics",
    purpose: "Display current dining options and hours with proxies.",
    slots: ["post", "anchor_timetable", "digest_line"],
    writes: [],
    guardrails: ["proxy_cache"],
    pii: false
  },
  {
    id: "library_hours",
    name: "Library Hours",
    category: "Place & Logistics",
    purpose: "Show library opening hours and available seats when possible.",
    slots: ["post", "anchor_timetable"],
    writes: [],
    guardrails: ["proxy_cache"],
    pii: false
  },
  {
    id: "emergency_alerts",
    name: "Emergency / Safety Alerts",
    category: "Care & Safety",
    purpose: "Surface emergency communications or safety alerts from campus feeds.",
    slots: ["post", "digest_line"],
    writes: [],
    guardrails: ["source_allowlist", "kill_switch"],
    pii: false
  }
];

const elementCatalogMap = new Map(
  elementCatalog.map((definition) => [definition.id, definition] as const)
);

export const lookupElementDefinition = (id: string): ElementDefinition | undefined => {
  const direct = elementCatalogMap.get(id);
  if (direct) return direct;
  return elementCatalogMap.get(id.toLowerCase());
};
