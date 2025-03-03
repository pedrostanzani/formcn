"use client";
import { usePlaygroundStore } from "@/stores/playground";

export function Debug() {
  const { form } = usePlaygroundStore();

  return <pre>{JSON.stringify(form, null, 2)}</pre>;
}
