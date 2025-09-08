import { redirect } from "next/navigation";

export default function AdminRoot() {
  // Redirect to the dashboard by default
  redirect("/dashboard");
}