import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { getFirestore } from "firebase-admin/firestore";
import type { School } from "@hive/core";
import { WaitlistProgress } from "./components/waitlist-progress";
import { WaitlistForm } from "./components/waitlist-form";
import { logger } from "@hive/core";

type WaitlistPageProps = {
  params: Promise<{
    schoolId: string;
  }>;
};

async function getSchool(schoolId: string): Promise<School | null> {
  try {
    const db = getFirestore();
    const schoolDoc = await db.collection("schools").doc(schoolId).get();
    if (!schoolDoc.exists) {
      return null;
    }
    return { id: schoolDoc.id, ...schoolDoc.data() } as School;
  } catch (error) {
    logger.error("Failed to fetch school", error);
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-4 sm:p-24">
      <Card className="w-full max-w-md bg-zinc-900/95 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white font-display">
            {school.name}
          </CardTitle>
          <CardDescription className="text-zinc-400 font-sans">
            Join the founding UB community on HIVE!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-center gap-4">
          <WaitlistProgress currentCount={school.waitlistCount} />
          <WaitlistForm
            schoolDomain={school.domain}
            schoolId={school.id}
            schoolName={school.name}
          />
        </CardContent>
      </Card>
    </main>
  );
}
