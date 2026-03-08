import { PiggyBank } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
      <PiggyBank className="size-12" />
      <h1 className="text-2xl font-semibold text-foreground">Budgets</h1>
      <p>Coming soon</p>
    </div>
  );
}
