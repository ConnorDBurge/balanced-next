"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode, type ComponentType } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface TabbedDialogTab {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  content: ReactNode;
}

interface TabbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  tabs: TabbedDialogTab[];
  /** Extra content rendered after the dialog (e.g. confirmation dialogs) */
  extra?: ReactNode;
  className?: string;
}

export function TabbedDialog({
  open,
  onOpenChange,
  title,
  tabs,
  extra,
  className,
}: TabbedDialogProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const [exiting, setExiting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const measureHeight = useCallback(() => {
    if (contentRef.current) {
      const inner = contentRef.current.firstElementChild as HTMLElement | null;
      if (inner) setContentHeight(inner.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measureHeight();
  }, [activeTab, measureHeight]);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(measureHeight);
    const inner = contentRef.current.firstElementChild as HTMLElement | null;
    if (inner) observer.observe(inner);
    return () => observer.disconnect();
  }, [activeTab, measureHeight]);

  // Reset to first tab when dialog closes
  useEffect(() => {
    if (!open) setActiveTab(tabs[0]?.id ?? "");
  }, [open, tabs]);

  function switchTab(tabId: string) {
    if (tabId === activeTab || exiting) return;
    setExiting(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setExiting(false);
    }, 200);
  }

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`overflow-hidden ${className ?? "sm:max-w-xl"}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {/* Tab bar */}
          {tabs.length > 1 && (
            <div className="relative flex gap-1 rounded-lg bg-muted/50 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
              {/* Animated pill indicator */}
              <div
                className="absolute inset-y-1 rounded-md bg-background shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  left: `calc(${(activeIndex / tabs.length) * 100}% + 4px)`,
                  width: `calc(${100 / tabs.length}% - 8px)`,
                }}
              />
            </div>
          )}

          {/* Animated content area */}
          <div
            className="relative overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ height: contentHeight != null ? `${contentHeight}px` : "auto" }}
          >
            <div ref={contentRef}>
              <div
                key={activeTab}
                className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  exiting
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {activeContent}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {extra}
    </>
  );
}
