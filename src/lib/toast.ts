import { toast } from "sonner";
import { createElement } from "react";
import { CircleCheck, CircleX, TriangleAlert, Info } from "lucide-react";

function makeToast(
  icon: Parameters<typeof createElement>[0],
  iconClass: string,
  panelClass: string,
  borderClass: string,
  message: string,
) {
  toast.custom(
    () =>
      createElement(
        "div",
        {
          className: `rounded-lg border ${borderClass} bg-white dark:bg-zinc-900 shadow-lg flex items-stretch min-w-[320px] max-w-[420px] overflow-hidden`,
        },
        createElement(
          "div",
          { className: `flex items-center justify-center px-4 ${panelClass}` },
          createElement(icon as string, { className: `size-6 ${iconClass}` })
        ),
        createElement(
          "div",
          { className: "flex items-center px-4 py-3.5" },
          createElement("span", { className: "text-sm font-semibold text-gray-900 dark:text-gray-100" }, message)
        )
      ),
    { duration: 5000 }
  );
}

export function successToast(message: string) {
  makeToast(CircleCheck, "text-emerald-500", "bg-emerald-500/15", "border-emerald-500", message);
}

export function errorToast(message: string) {
  makeToast(CircleX, "text-red-500", "bg-red-500/15", "border-red-500", message);
}

export function warningToast(message: string) {
  makeToast(TriangleAlert, "text-amber-500", "bg-amber-500/15", "border-amber-500", message);
}

export function infoToast(message: string) {
  makeToast(Info, "text-blue-500", "bg-blue-500/15", "border-blue-500", message);
}
