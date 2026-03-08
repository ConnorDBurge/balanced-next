import { redirect } from "next/navigation";

export default function PersonalSettingsPage() {
  redirect("/settings/workspace?personal=1");
}
