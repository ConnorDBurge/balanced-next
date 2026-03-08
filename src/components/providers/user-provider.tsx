"use client";

import { createContext, useContext } from "react";

export interface AppUser {
  name: string;
  email: string;
}

interface UserContextValue {
  user: AppUser;
  signOutAction: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({
  user,
  signOutAction,
  children,
}: UserContextValue & { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={{ user, signOutAction }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
