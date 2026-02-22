"use client";

import { useContext } from "react";
import { LifeWorkContext } from "@/contexts/LifeWorkContext";

export function useLifeWork() {
  const context = useContext(LifeWorkContext);
  if (!context) {
    throw new Error("useLifeWork must be used within LifeWorkProvider");
  }
  return context;
}
