import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { getFirestore } from 'firebase-admin/firestore';
import { School } from "@hive/core/src/domain/school";
import { WaitlistProgress } from "./components/waitlist-progress";
import { WaitlistForm } from "./components/waitlist-form";

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
    console.error("Failed to fetch school", error);
    return null;
  }
}

export default async function WaitlistPage({ params }: WaitlistPageProps) {
  const { schoolId } = await params;
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
          <WaitlistForm schoolDomain={school.domain} schoolId={school.id} />
        </CardContent>
      </Card>
    </main>
  );
} 