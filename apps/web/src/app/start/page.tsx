"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@hive/ui";
import { CAMPUSES, Campus, saveSelectedCampus } from "@/lib/start-flow";

const HERO_COPY = "We use campus email verification to keep HIVE authentic to your university. Pick your school to get a personalized invite.";

export default function StartSchoolPickerPage(): JSX.Element {
  const router = useRouter();
  const query = useSearchParams();
  const preselect = query.get("school");

  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selected, setSelected] = useState<Campus | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [requestCampus, setRequestCampus] = useState<Campus | null>(null);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestError, setRequestError] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CAMPUSES.slice(0, 6);
    return CAMPUSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.short.toLowerCase().includes(q) ||
        c.domain.includes(q)
    ).slice(0, 6);
  }, [search]);

  useEffect(() => {
    if (!preselect) return;
    const match = CAMPUSES.find(
      (c) =>
        c.id === preselect ||
        c.short.toLowerCase() === preselect?.toLowerCase()
    );
    if (match && match.available !== false) {
      setSelected(match);
    }
  }, [preselect]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [results]);

  function handleSelect(campus: Campus) {
    if (campus.available === false) return;
    setSelected(campus);
    setAnnouncement(`${campus.name} selected`);
  }

  function handleContinue() {
    if (!selected) return;
    saveSelectedCampus(selected);
    router.push("/start/email");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= results.length ? results.length - 1 : prev + 1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(results[highlightedIndex]);
    }
  }

  const lockedCampuses = CAMPUSES.filter((campus) => campus.available === false);

  function openRequest(campus: Campus) {
    setRequestCampus(campus);
    setRequestEmail("");
    setRequestError(null);
  }

  function submitRequest() {
    if (!requestCampus) return;
    if (!requestEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(requestEmail)) {
      setRequestError("Add a valid email so we can notify you.");
      return;
    }
    setAnnouncement(`We'll notify you when ${requestCampus.name} opens`);
    setRequestCampus(null);
  }

  return (
    <>
      <main className="space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            Step 1 of 4
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-tight">
              Choose your campus email
            </h1>
            <p className="text-base text-white/70">{HERO_COPY}</p>
          </div>
        </div>

        <section className="space-y-6">
          <div>
            <label
              htmlFor="school"
              className="mb-2 block text-sm font-medium text-white/60"
            >
              Search your school
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="school"
                data-testid="start-school-search"
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-12 py-4 text-base text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                placeholder="UB, Buffalo State, Cornell, RIT…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="campus-results"
                aria-activedescendant={
                  results[highlightedIndex]
                    ? `campus-${results[highlightedIndex].id}`
                    : undefined
                }
              />
            </div>
            <p className="mt-2 text-xs text-white/45">
              Use ↑ and ↓ to navigate, Enter to select.
            </p>
          </div>

          <div>
            <ul
              id="campus-results"
              role="listbox"
              className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-white/50">
                  No campuses found. Email{" "}
                  <a href="mailto:privacy@hive.college" className="underline">
                    privacy@hive.college
                  </a>{" "}
                  to request access.
                </li>
              )}
              {results.map((campus, index) => {
                const isActive = index === highlightedIndex;
                const isSelected = selected?.id === campus.id;
                const isLocked = campus.available === false;
                return (
                  <li key={campus.id}>
                    <button
                      id={`campus-${campus.id}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isLocked}
                      onClick={() => handleSelect(campus)}
                      disabled={isLocked}
                      className={`group relative flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition ${
                        isLocked
                          ? "cursor-not-allowed opacity-60"
                          : isActive
                          ? "bg-white/10"
                          : isSelected
                          ? "bg-white/5"
                          : "hover:bg-white/5"
                      }`}
                      data-testid={`start-school-option-${campus.id}`}
                    >
                      <div>
                        <div className="text-base font-semibold">{campus.name}</div>
                        <div className="text-xs text-white/60">@{campus.domain}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isSelected
                              ? "bg-white text-black"
                              : "border border-white/25 text-white/70"
                          }`}
                        >
                          {isLocked ? "Locked" : campus.short}
                        </span>
                        {isLocked && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openRequest(campus);
                            }}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white"
                          >
                            Request
                          </button>
                        )}
                      </div>
                      {isLocked && (
                        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-black/65 backdrop-blur-[2px] text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 flex items-center justify-center">
                          Coming Soon
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="sr-only" role="status" aria-live="polite">
              {announcement}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
            {selected ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Selected campus
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {selected.name}
                  </div>
                  <div className="text-xs text-white/50">@{selected.domain}</div>
                </div>
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/80">
                  Verified with .edu
                </span>
              </div>
            ) : (
              <p>Select a campus to unlock the next step.</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="text-sm text-white/60">Popular campuses</div>
            <div className="flex flex-wrap gap-3">
              {CAMPUSES.slice(0, 8).map((campus) => {
                const isSelected = selected?.id === campus.id;
                const isLocked = campus.available === false;
                return (
                  <div key={campus.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelect(campus)}
                      disabled={isLocked}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        isLocked
                          ? "border border-white/10 text-white/40 cursor-not-allowed"
                          : isSelected
                          ? "bg-white text-black"
                          : "border border-white/20 text-white/80 hover:border-white/50"
                      }`}
                      data-testid={`start-popular-${campus.id}`}
                    >
                      {campus.short}
                    </button>
                    {isLocked && (
                      <button
                        type="button"
                        onClick={() => openRequest(campus)}
                        className="text-xs text-white/70 underline"
                      >
                        Request
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-sm text-white/60">
            Need help?{" "}
            <a className="text-white underline" href="mailto:privacy@hive.college">
              privacy@hive.college
            </a>
          </div>
          <Button
            size="lg"
            variant="primary"
            className="min-w-[160px]"
            disabled={!selected}
            onClick={handleContinue}
            data-testid="start-continue"
          >
            Continue
          </Button>
        </div>

        <p className="text-xs text-white/45">
          By continuing you agree to our {" "}
          <a className="underline" href="/legal/terms">
            Terms
          </a>{" "}
          and {" "}
          <a className="underline" href="/legal/privacy">
            Privacy
          </a>
          .
        </p>

        {lockedCampuses.length > 0 && (
          <div className="text-sm text-white/60">
            Want {lockedCampuses.map((c) => c.short).join(", ")}?
            <button className="ml-2 underline" onClick={() => openRequest(lockedCampuses[0])}>
              Request access
            </button>
          </div>
        )}
      </main>

      {requestCampus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#050505] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <button
              className="absolute right-4 top-4 text-white/60 hover:text-white"
              onClick={() => setRequestCampus(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold">Request {requestCampus.short}</h2>
            <p className="mt-2 text-sm text-white/70">
              {requestCampus.name} isn’t live yet. Drop your email and we’ll ping you the moment it opens.
            </p>
            <div className="mt-5 space-y-3">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50" htmlFor="request-email">
                Notify me at
              </label>
              <input
                id="request-email"
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                placeholder="you@school.edu"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
              />
              {requestError && <p className="text-sm text-red-300">{requestError}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="text-sm text-white/70 hover:text-white" onClick={() => setRequestCampus(null)}>
                Cancel
              </button>
              <Button size="lg" variant="primary" onClick={submitRequest}>
                Notify me
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 15a6 6 0 1 0-4.243-1.757A6 6 0 0 0 9 15Zm0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
