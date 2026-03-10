import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(dateStr: string | null, fallback = "—"): string {
  if (!dateStr) return fallback;
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  const dateFormatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatted = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  let relative: string;
  if (diffMins < 1) relative = "just now";
  else if (diffMins < 60) relative = `${diffMins}m ago`;
  else {
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) relative = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    else {
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 30) relative = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      else {
        const diffMonths = Math.floor(diffDays / 30);
        relative = `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
      }
    }
  }

  return `${dateFormatted} at ${timeFormatted} (${relative})`;
}
