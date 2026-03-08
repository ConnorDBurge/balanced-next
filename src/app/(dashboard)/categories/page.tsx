import { FolderTree } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
      <FolderTree className="size-12" />
      <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
      <p>Coming soon</p>
    </div>
  );
}
