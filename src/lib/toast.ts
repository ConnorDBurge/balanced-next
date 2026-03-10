import { toast } from "sonner";
import { createElement } from "react";
import { CircleCheck, CircleX } from "lucide-react";

function formatTimestamp(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }) + " at " + new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function successToast(message: string) {
  const timestamp = formatTimestamp();
  toast.custom(
    () =>
      createElement(
        "div",
        {
          className:
            "relative overflow-hidden rounded-lg bg-emerald-500 border border-emerald-400 text-white px-4 py-3 shadow-lg flex items-start gap-2 min-w-[280px]",
        },
        createElement(CircleCheck, { className: "size-4 text-white shrink-0 mt-0.5" }),
        createElement(
          "div",
          { className: "flex flex-col" },
          createElement("span", { className: "text-sm font-medium" }, message),
          createElement("span", { className: "text-xs text-emerald-100" }, timestamp)
        ),
        createElement("div", {
          className: "absolute bottom-0 left-0 h-1 bg-emerald-300 rounded-b-lg",
          style: { animation: "toast-progress 5s linear forwards" },
        })
      ),
    { duration: 5000 }
  );
}

export function errorToast(message: string) {
  const timestamp = formatTimestamp();
  toast.custom(
    () =>
      createElement(
        "div",
        {
          className:
            "relative overflow-hidden rounded-lg bg-red-700 border border-red-600 text-white px-4 py-3 shadow-lg flex items-start gap-2 min-w-[280px]",
        },
        createElement(CircleX, { className: "size-4 text-red-200 shrink-0 mt-0.5" }),
        createElement(
          "div",
          { className: "flex flex-col" },
          createElement("span", { className: "text-sm font-medium" }, message),
          createElement("span", { className: "text-xs text-red-300/80" }, timestamp)
        ),
        createElement("div", {
          className: "absolute bottom-0 left-0 h-1 bg-red-400 rounded-b-lg",
          style: { animation: "toast-progress 5s linear forwards" },
        })
      ),
    { duration: 5000 }
  );
}
