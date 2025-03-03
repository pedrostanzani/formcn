"use client";

import { usePlaygroundStore } from "@/stores/playground";

export function Debug() {
  const { form } = usePlaygroundStore();

  return (
    <div className="text-xs px-6">
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
