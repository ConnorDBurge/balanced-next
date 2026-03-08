import { Settings } from "lucide-react";

export default function WorkspaceSettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
      <Settings className="size-12" />
      <h1 className="text-2xl font-semibold text-foreground">Workspace Settings</h1>
      <p>Coming soon</p>
    </div>
  );
}
