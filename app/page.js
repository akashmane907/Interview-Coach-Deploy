import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /dashboard immediately when visiting /
  redirect("/dashboard");
  return null; // Return null since this component won't render anything
}
