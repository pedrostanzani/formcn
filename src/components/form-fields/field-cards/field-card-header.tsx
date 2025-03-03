import { Square } from "lucide-react";

import { FieldType } from "@/core/types";
import { fieldSections } from "@/core/static/field-sections";
import { cn, isTruthy } from "@/lib/utils";

export function FieldCardHeader({ fieldType }: { fieldType: FieldType }) {
  const fieldSection = fieldSections.find(
    (section) => section.type === fieldType,
  );

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-sm font-mono text-xs leading-none font-bold text-white select-none",
          fieldSection?.accentBackground ?? "bg-zinc-500",
        )}
      >
        {fieldSection?.icon ? (
          <fieldSection.icon className="h-5 w-5" />
        ) : (
          <Square className="h-5 w-5" />
        )}
      </div>
      <span className="font-medium">
        {isTruthy(fieldSection?.sectionName)
          ? fieldSection.sectionName.slice(0, -1)
          : "Unknown field"}
      </span>
    </div>
  );
}
