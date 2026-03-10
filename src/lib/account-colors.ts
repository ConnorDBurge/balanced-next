import type { AccountStatus, AccountType } from "@/types/account";

export const TYPE_DOT_COLORS: Record<AccountType, string> = {
  CASH: "bg-emerald-500",
  CREDIT: "bg-amber-500",
  INVESTMENT: "bg-blue-500",
  LOAN: "bg-red-500",
  REAL_ESTATE: "bg-violet-500",
  VEHICLE: "bg-cyan-500",
  EMPLOYEE_COMPENSATION: "bg-pink-500",
  OTHER_LIABILITY: "bg-orange-500",
  OTHER_ASSET: "bg-slate-500",
};

export const TYPE_BADGE_COLORS: Record<AccountType, string> = {
  CASH: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  CREDIT: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  INVESTMENT: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  LOAN: "bg-red-500/15 text-red-600 dark:text-red-400",
  REAL_ESTATE: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  VEHICLE: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  EMPLOYEE_COMPENSATION: "bg-pink-500/15 text-pink-600 dark:text-pink-400",
  OTHER_LIABILITY: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  OTHER_ASSET: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

export const STATUS_COLORS: Record<AccountStatus, string> = {
  ACTIVE: "text-emerald-600 dark:text-emerald-400",
  ARCHIVED: "text-muted-foreground",
  CLOSED: "text-muted-foreground/60",
};

export const STATUS_DOT_COLORS: Record<AccountStatus, string> = {
  ACTIVE: "text-emerald-500",
  ARCHIVED: "text-muted-foreground",
  CLOSED: "text-muted-foreground/60",
};
