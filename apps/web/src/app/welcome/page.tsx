import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui/components/card";
import { SchoolSearch } from "./components/school-search";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-24">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to HIVE</CardTitle>
          <CardDescription>Find your campus to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SchoolSearch />
        </CardContent>
      </Card>
    </main>
  );
} 