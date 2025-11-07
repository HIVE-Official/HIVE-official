// Server component: fetches data with firebase-admin on the server
import 'server-only';

import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { dbAdmin } from "@/lib/firebase-admin";
import type { School } from "@hive/core";
import { WaitlistProgress } from "./components/waitlist-progress";
import { WaitlistForm } from "./components/waitlist-form";

// Force dynamic rendering since we need Firebase Admin at runtime
export const dynamic = 'force-dynamic';

type WaitlistPageProps = {
  params: {
    schoolId: string;
  };
};

async function getSchool(schoolId: string): Promise<School | null> {
  try {
    const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();
    if (!schoolDoc.exists) {
      return null;
    }
    return { id: schoolDoc.id, ...schoolDoc.data() } as School;
  } catch (error) {
    return null;
  }
}

export default async function WaitlistPage({ params }: WaitlistPageProps) {
  const { schoolId } = params;
  const school = await getSchool(schoolId);

  if (!school) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-24">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{school.name}</CardTitle>
          <CardDescription>
            Join the waitlist to bring HIVE to your campus!
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
