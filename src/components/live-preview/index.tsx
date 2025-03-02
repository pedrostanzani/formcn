"use client";
import { usePlaygroundStore } from "@/stores/playground";

import { FormPreview } from "./form-preview";
import { CodePreview } from "./code-preview";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function LivePreview() {
  const { currentTab } = usePlaygroundStore();

  return (
    <Fragment>
      <FormPreview className={cn(currentTab !== "form" && "hidden")} />
      <CodePreview
        className={cn(currentTab !== "code" && "hidden")}
        sourceCode={"console.log('Hello, world!')"}
      />
    </Fragment>
  );
}
