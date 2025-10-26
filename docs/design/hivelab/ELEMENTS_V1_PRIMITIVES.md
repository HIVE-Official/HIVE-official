# HiveLab Elements — Primitives Catalog v1 (Final)

Source: Product handoff 2025-10-19. This document defines Elements (primitives), their slots, operators, canonical record writes, and per‑element behaviors. Terminology uses post (not “board card”). No tool templates are included here.

Note on naming: Spaces still render a Board surface, but element placement refers to the post data object. Use “post” for payload contracts and “Board” only for the Space UI surface when needed.

---

## Conventions

Slots (where an element can render)

- post (Space post)
- event_before · event_during · event_after (attach to Event lifecycle)
- calendar_badge · calendar_panel
- members_badge (roster chips)
- digest_line (daily/weekly digest contribution)
- anchor_timetable (campus anchor rows; future‑facing)
- profile_overlay (private, personal surface)

Operators (universal switches)

- TTL · GateByLabel · VisibilityWindow · DigestContribution · ModerationMode · LightMode

Canonical records (writes)

form_submission, vote, file_metadata, acknowledge, slot_claim, checkin, checkout, counter_tick, kudos, task, label, member_label, pairing, checkout(equipment), checkin(equipment), invite_use, cohost_request, cohost_accept, media_upload, kb_article, announcement, service_request, queue_join, queue_serve, case, referral, training_complete, program_enroll, program_step_complete, risk_ack, guest_invite, guest_checkin, ratio_snapshot, capacity_event, incident, escalation, pnm, pnm_rating, bid, hearing, sanction, sub_space, sub_space_membership, pulse, space_panel_config, class_meeting, class_membership, busy_block, fit_prefs, soft_hold, free_window

Per‑element doc fields

Purpose · Slots/Scope · Config · Writes · Outputs · Capabilities (if any) · Guardrails · Native · Adaptation/Light‑mode

---

## A. Foundation (global, reusable)

Quick Form

- Purpose: capture short inputs (interest, micro‑feedback, intake).
- Slots/Scope: post, event_before.
- Config: up to 5 fields (text/choice/date/file), required flags, close time.
- Writes: form_submission.
- Outputs: CSV.
- Guardrails: PII lint (phone/SSN blocked), file size cap, optional TTL.
- Native: Student Org.

Poll / Rank

- Purpose: decide (single/multi) or prioritize (rank).
- Slots: post, event_during.
- Config: mode (single/multi/rank), results (now/end/never), close time.
- Writes: vote.
- Outputs: bars + CSV.
- Guardrails: options lock after first vote (unless “editable”).
- Native: Student Org.

File Upload

- Purpose: collect one file per submission (waiver/receipt/proof).
- Slots: post, event_before.
- Config: types, max size, “require before check‑in”.
- Writes: file_metadata.
- Outputs: ZIP/links.
- Guardrails: safe‑scan; retention.

Acknowledge (Policy/Step)

- Purpose: lightweight attestations.
- Slots: post, event_before (also pre‑publish gate).
- Config: policy template, audience, expiry/renewal.
- Writes: acknowledge{policy|step}.
- Outputs: CSV/PDF.
- Native: Univ Org.

Slots / Shifts

- Purpose: book appointments (slots) or staff roles (shifts).
- Slots: event_before, event_during, post.
- Config: slot length, per‑person cap, buffers, waitlist, reminders.
- Writes: slot_claim.
- Outputs: CSV roster, ICS per claim.
- Guardrails: conflict check; weekly cap.

Check‑In Pro (“Tap‑in”)

- Purpose: attendance; multi‑station; optional tap‑out.
- Slots: event_during.
- Config: stations, late window, headcount tile.
- Writes: checkin, optional checkout.
- Outputs: CSV (station, ts), live count.
- Guardrails: per‑day quotas; disable if venue mandates external check‑in.

Counter / Scoreboard

- Purpose: +1 contributions; goals; streaks.
- Slots: post, event_during.
- Config: who can increment, goal line, reset cadence.
- Writes: counter_tick.
- Outputs: CSV, meter.
- Guardrails: tap throttle; undo window.

Kudos / Shoutout

- Purpose: recognition; optional weekly roll‑up.
- Slots: post.
- Config: images on/off; weekly roll‑up toggle.
- Writes: kudos.
- Outputs: roll‑up post.
- Guardrails: moderation/report.

Tasks (Lite)

- Purpose: checklist/kanban.
- Slots: post.
- Config: columns, assignee, due, reminders.
- Writes: task.
- Outputs: CSV.
- Guardrails: column caps; digest bundling.

Labels (Members)

- Purpose: audience segmentation & roster chips.
- Slots: members_badge (manage via settings).
- Config: create/rename/hide; self‑selectable vs admin‑assigned.
- Writes: label, member_label.
- Outputs: filter chips.
- Capabilities: leader/RA to manage.

Pairing / Matchmaker

- Purpose: pair users or form small teams.
- Slots: post.
- Config: pairs/teams, fairness, cooldown, 1–2 prompts.
- Writes: pairing.
- Outputs: CSV.
- Guardrails: limited criteria to avoid bias.

Equipment Checkout (Loans)

- Purpose: lend items (gear/games).
- Slots: post, manage.
- Config: items, due windows, reminders, per‑user caps.
- Writes: checkout (equipment), checkin (equipment).
- Outputs: ledger CSV.
- Capabilities: leader/RA to enable.

InviteLink (capped/tracked)

- Purpose: controlled growth with attribution.
- Slots: post.
- Config: caps, expiry, per‑member quotas.
- Writes: invite_use.
- Outputs: join stats.
- Guardrails: cooldowns; token audit.

Co‑host Handshake

- Purpose: request/accept co‑host; mirror posts.
- Slots: event_before.
- Config: partner space, metrics mode.
- Writes: cohost_request, cohost_accept.
- Outputs: linked posts.
- Guardrails: mutual consent; unbind.

PhotoDrop / Gallery

- Purpose: member photo uploads → curated grid.
- Slots: event_during, event_after, post.
- Config: max images/person; moderation (auto/mod).
- Writes: media_upload.
- Outputs: gallery; recap picks.
- Guardrails: safe‑scan; report pipeline.

Resource List / Brand Kit

- Purpose: curated links/files.
- Slots: post.
- Config: ordered items; visibility by role.
- Writes: link metadata / optional kb_article.
- Outputs: DS list.
- Guardrails: safe‑link lint.

Heads‑Up (TTL Announcement)

- Purpose: expiring announcements; digest‑aware.
- Slots: post, digest_line.
- Config: TTL required; schedule; optional labels (capability).
- Writes: announcement.
- Outputs: reach stats; auto‑fade.
- Guardrails: a11y copy lint; daily quota.

Knowledge Base / FAQ

- Purpose: DS‑rendered help articles.
- Slots: post (index), dedicated reader.
- Config: tags, featured pins.
- Writes: kb_article.
- Outputs: search hits; list.
- Guardrails: versioning; safe links.

---

## B. Event Extensions (attach to lifecycle)

Advisor/Approver Checklist

- Purpose: room/AV/contracts/a11y pre‑checks.
- Slots: event_before.
- Config: steps on/off; “required to publish”; attachments.
- Writes: acknowledge{step}, file_metadata.
- Outputs: PDF packet.
- Capabilities: leader/staff for enforcement.
- Adaptation: trims outside compliance contexts.

Policy Acknowledge

- Purpose: food/photo/a11y/etc. acks.
- Slots: event_before.
- Config: policy templates, audience.
- Writes: acknowledge{policy}.
- Outputs: CSV.

Volunteer Shifts / Tryout Slots

- Slots: event_before, event_during.
- See: Slots/Shifts (above).

File Upload / Waiver (Event)

- Slots: event_before.
- See: File Upload (above).

Live Counter / Pulse

- Slots: event_during.
- See: Counter (above).

PhotoDrop (Event)

- Slots: event_during, event_after.
- See: PhotoDrop (above).

Co‑host Handshake (Event)

- Slots: event_before.
- See: Co‑host (above).

Transit ETA (Panel)

- Purpose: arrivals near venue.
- Slots: calendar_badge, event_before, anchor_timetable.
- Config: venue stops, walking buffer.
- Writes: — (read‑only).
- Outputs: ETA chip/panel.
- Guardrails: proxy/cache.

Weather Risk Flags

- Purpose: precip/wind/heat cue.
- Slots: calendar_badge, event_before.
- Writes: —.
- Outputs: risk chips.
- Guardrails: source allowlist.

Room Info & Wayfinding

- Purpose: capacity/AV/a11y tips + map link.
- Slots: calendar_panel.
- Writes: —.
- Outputs: panel.
- Guardrails: curated dataset.

---

## C. University Org (service/compliance)

Service Request Intake

- Purpose: structured tickets.
- Slots: post.
- Config: type, priority, due, assignee, attachments.
- Writes: service_request, file_metadata, note.
- Outputs: CSV/PDF queue.
- Adaptation: “Task Inbox” in clubs (no SLA).

Walk‑in Queue / Ticket

- Purpose: lobby/desk queue.
- Slots: post.
- Config: categories, ticket prefix, max length, open/close.
- Writes: queue_join, queue_serve.
- Outputs: now‑serving; CSV.
- Adaptation: “Sign‑up Queue” in clubs.

Case File (Lite)

- Purpose: lightweight case wrapper.
- Slots: post.
- Config: status flow, checklist, notes, files.
- Writes: case, task, file_metadata, note.
- Outputs: case PDF.
- Guardrails: redaction defaults.

Referral (Space→Space)

- Purpose: warm handoff.
- Slots: post.
- Config: target space, due, reason.
- Writes: referral.
- Outputs: CSV + link card.

Training Completion Tracker

- Purpose: track training done (proof files).
- Slots: post.
- Config: modules, due windows, proof upload.
- Writes: training_complete, file_metadata.
- Outputs: CSV/PDF.

Program Series Manager

- Purpose: multi‑session enroll→attend→complete.
- Slots: post.
- Config: sessions list, required %, reflection.
- Writes: program_enroll, program_step_complete.
- Outputs: CSV/PDF.

Brand/A11y Review Gate

- Purpose: pre‑publish checks for major comms.
- Slots: pre‑publish hook on large posts/announcements.
- Config: checklist.
- Writes: acknowledge{checklist_item}.
- Outputs: pass/fail + PDF.

Announcement (TTL + Targeting)

- Purpose: targeted expiring comms.
- Slots: post, digest_line.
- Config: labels, TTL, schedule.
- Writes: announcement.
- Outputs: reach stats.
- Capabilities: staff/leader for targeting.

Compliance/Recognition Auto‑Pack (extension)

- Purpose: export bundle (attendance, acks, completion).
- Slots: admin tile.
- Writes: — (reads).
- Outputs: ZIP (CSV/PDF).

---

## D. Greek (risk, recruitment, standards, house)

Risk Checklist

- Purpose: social/formal risk gate.
- Slots: event_before.
- Config: registration lead‑time, vendor, security, sober coverage, capacity, neighbor notice.
- Writes: risk_ack, file_metadata.
- Outputs: Risk PDF.

Sober Monitor Assignment

- Purpose: coverage staffing.
- Slots: event_before, event_during.
- Config: blocks, coverage meter, training ack.
- Writes: slot_claim{role:"sober_monitor"}.
- Outputs: roster CSV.

Guest List Manager

- Purpose: invites & door list; ratio/cap.
- Slots: event_before, event_during.
- Config: import list, cap, ratio, invites.
- Writes: guest_invite, guest_checkin, ratio_snapshot.
- Outputs: CSV; meters.

Capacity Control

- Purpose: live cap tied to check‑in; door open/closed.
- Slots: event_during.
- Config: cap; toggle; headcount.
- Writes: capacity_event.
- Outputs: cap history.

Incident Intake (private)

- Purpose: structured incidents & escalations.
- Slots: event_during, post (private).
- Config: category, photos, severity, escalation.
- Writes: incident, file_metadata, note, escalation.
- Outputs: Incident PDF.

PNM Intake / Rating / Bids / Education / Standards / Sanctions / House Ops

- Purpose: recruitment & standards primitives (see records).
- Slots: mostly post; some attach to events.
- Writes/Outputs: pnm, pnm_rating, bid, hearing, sanction + CSV/PDF exports.

---

## E. Residential (building‑level; RA unlocks marked)

Roommate / Suite Pact

- Purpose: shared expectations + signatures.
- Slots: post.
- Writes: agreement, acknowledge.
- Outputs: PDF.

Fix‑It Ticket (Snap & Send)

- Purpose: maintenance report → email/PDF packet.
- Slots: post.
- Writes: service_request, file_metadata.
- Outputs: PDF/email packet.

Create Sub‑Space (RA‑only)

- Purpose: managed sub‑communities with TTL.
- Slots: post (one‑time “Start”).
- Writes: sub_space, sub_space_membership.
- Outputs: Sub‑Space Wrap (CSV/PDF).
- Capabilities: ra.

Label Manager (RA)

- Purpose: wings/LLC/interests labels; self‑select toggles.
- Slots: settings/manage.
- Writes: label, member_label.

Room/Lounge Booking (RA)

- Purpose: conflict‑safe room reservations.
- Slots: post.
- Writes: slot_claim{room_id,start,end}.
- Outputs: ICS; conflict prevent.

Community Challenge

- Purpose: building‑wide counter campaign.
- Slots: post.
- Writes: counter_tick, campaign.
- Outputs: leaderboard; CSV.

Host Signup (RA approve)

- Purpose: residents propose activities; RA approves → scaffold.
- Slots: post.
- Writes: proposal, approval.

Quiet Pulse (aggregate; RA view)

- Purpose: residents tap “too loud now”; RA heatmap.
- Slots: post (tap), RA panel.
- Writes: pulse{wing?, ts}.

Fix‑It Bundle / Panel Picker (extensions; RA)

- Slots: admin tiles.
- Writes: space_panel_config (picker).
- Outputs: PDF bundle; layout changes.

Resource Exchange (optional; RA moderated)

- Purpose: give/take free items; expiring list.
- Slots: post.
- Writes: exchange_post, moderation_action.

---

## F. Classes (Profile → Calendar; private schedule)

Add Class

- Purpose: recurring class meetings for Fit.
- Slots: profile_overlay.
- Writes: class_meeting, class_membership.
- Outputs: personal calendar items.

Busy Block Builder

- Purpose: lab/job/study/commute blocks.
- Slots: profile_overlay.
- Writes: busy_block.

Fit Settings

- Purpose: buffers/walking speed/preferences.
- Slots: profile_overlay.
- Writes: fit_prefs.

Schedule‑Aware RSVP / Soft Hold

- Purpose: one‑tap RSVP when it fits; hold otherwise.
- Slots: event cards (personal eval).
- Writes: rsvp, soft_hold.
- Outputs: Fit/Near‑fit/Conflict chip + ICS.

Flex Block Generator

- Purpose: create free windows for suggestions.
- Slots: profile_overlay.
- Writes: free_window.

Conflict Nudger

- Purpose: show near alternatives that fit.
- Slots: event cards (personal).
- Writes: nudge_view (analytics).

---

## G. External Info (read‑only panels; proxy/cache; DS render)

Transit ETA · Weather Risk · Room Info & Wayfinding · Dining Menus & Hours · Library Hours (& seats where available) · IT/Printing Status · Parking/Garage Availability · Laundry Status (where feeds exist) · Athletics Schedule & Scores · Campus News (RSS) · Emergency/Safety Alerts · Gym/Rec Hours · Bookstore/Services Hours · Career/Opportunities Feed

- Slots: post, calendar_badge/panel, event_before, anchor_timetable, digest_line.
- Writes: —.
- Outputs: DS cards/badges; “last updated”.
- Guardrails: server proxy + cache; source allowlist; kill‑switch.

---

## H. Cross‑use Adaptation & Light‑Mode (applies to any element)

- Adaptation banners: rename fields, trim risky options, swap exports, tune defaults when non‑native.
- Light‑Mode compiler: if required capability missing (ra, exec, staff, event_context), run with lower caps, required TTL, moderated uploads off.
- Swap suggestions: show 1‑tap native alternatives on warning.
- Global lint: PII blocks, TTL on announcements, digest bundling, alt‑text nudge.

