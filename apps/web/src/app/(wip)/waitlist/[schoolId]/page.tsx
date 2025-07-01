import React from "react";
import { notFound } from "next/navigation";
import { type School, logger } from "@hive/core";
import { WaitlistProgress } from "./components/waitlist-progress";
import { WaitlistForm } from "./components/waitlist-form";

type WaitlistPageProps = {
  params: Promise<{
    schoolId: string;
  }>;
};

async function getSchool(schoolId: string): Promise<School | null> {
  // This URL needs to be absolute for server-side fetching
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  const url = `${baseUrl}/api/waitlist/${schoolId}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // Revalidate every 60 seconds

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      // Throw an error to be caught by the catch block
      throw new Error(`Failed to fetch school data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    logger.error(`Failed to fetch school ${schoolId} from API route`, error);
    // In a real app, you might want to redirect to an error page
    // For now, we'll treat it as not found.
    return null;
  }
}

export default async function WaitlistPage({ params }: WaitlistPageProps) {
  const { schoolId } = await params;
  const school = await getSchool(schoolId);

  if (!school) {
    notFound();
  }

  // UB-only launch validation
  if (schoolId !== "suny-buffalo") {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-24">
      <div className="w-full max-w-md bg-zinc-900/95 border-zinc-800">
        <div className="text-center">
          <h1 className="text-2xl text-white font-display">
            {school.name}
          </h1>
          <p className="text-zinc-400 font-sans">
            Join the founding UB community on HIVE!
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <WaitlistProgress currentCount={school.waitlistCount} />
          <WaitlistForm
            schoolDomain={school.domain}
            schoolId={school.id}
            schoolName={school.name}
          />
        </div>
      </div>
    </main>
  );
}
