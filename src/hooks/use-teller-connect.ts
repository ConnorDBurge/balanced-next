"use client";

import { useEffect, useRef, useState } from "react";

interface TellerEnrollment {
  accessToken: string;
  user: { id: string };
  institution: { name: string };
}

interface TellerConnectCallbacks {
  onSuccess: (enrollment: TellerEnrollment) => void;
  onExit?: () => void;
  onFailure?: (failure: { type: string; code: string }) => void;
}

interface TellerConnectInstance {
  open: () => void;
}

interface TellerConnectSetupOptions extends TellerConnectCallbacks {
  applicationId: string;
  environment: "sandbox" | "development" | "production";
}

declare global {
  interface Window {
    TellerConnect: {
      setup: (options: TellerConnectSetupOptions) => TellerConnectInstance;
    };
  }
}

export function useTellerConnect() {
  const [scriptReady, setScriptReady] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (scriptRef.current) return;

    const existing = document.querySelector('script[src="https://cdn.teller.io/connect/connect.js"]');
    if (existing) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.teller.io/connect/connect.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
    scriptRef.current = script;
  }, []);

  function open(callbacks: TellerConnectCallbacks) {
    if (!scriptReady || !window.TellerConnect) return;
    const instance = window.TellerConnect.setup({
      applicationId: process.env.NEXT_PUBLIC_TELLER_APP_ID ?? "",
      environment: "sandbox",
      ...callbacks,
    });
    instance.open();
  }

  return { scriptReady, open };
}
