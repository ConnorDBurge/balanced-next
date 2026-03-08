"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PersonalSettingsModal } from "@/components/personal-settings-modal/personal-settings-modal";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const personalParam = searchParams.get("personal");
  const [personalOpen, setPersonalOpen] = useState(personalParam === "1");

  useEffect(() => {
    setPersonalOpen(personalParam === "1");
  }, [personalParam]);

  function handlePersonalOpenChange(open: boolean) {
    setPersonalOpen(open);
    const nextParams = new URLSearchParams(searchParams.toString());

    if (open) {
      nextParams.set("personal", "1");
    } else {
      nextParams.delete("personal");
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your workspace and personal preferences
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => handlePersonalOpenChange(true)}
          className="w-full sm:w-auto"
        >
          Personal settings
        </Button>
      </div>

      <PersonalSettingsModal
        open={personalOpen}
        onOpenChange={handlePersonalOpenChange}
      />
      {children}
    </div>
  );
}
