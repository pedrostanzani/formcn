import { Square } from "lucide-react";

import { FieldFormat, FieldType } from "@/core/types";
import { fieldSections } from "@/core/static/field-sections";
import { fieldFormats } from "@/core/static/field-formats";
import { cn, isTruthy } from "@/lib/utils";

export function FieldCardHeader({
  fieldType,
  fieldFormat,
}: {
  fieldType: FieldType;
  fieldFormat: FieldFormat;
}) {
  const fieldSection = fieldSections.find(
    (section) => section.type === fieldType,
  );

  const fieldFormatData = fieldFormats
    .find((format) => format.type === fieldType)
    ?.formats.find((format) => format.format === fieldFormat);

  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-sm font-mono text-xs leading-none font-bold text-white select-none",
          fieldSection?.accentBackground ?? "bg-zinc-500",
        )}
      >
        {fieldSection?.icon ? (
          <fieldSection.icon className="h-5 w-5" />
        ) : (
          <Square className="h-5 w-5" />
        )}
      </div>
      <div className="flex flex-col gap-1 pt-px">
        <span className="font-medium leading-none tracking-tight">
          {isTruthy(fieldSection?.sectionName)
            ? fieldSection.sectionName.slice(0, -1)
            : "Unknown field"}
        </span>
        <span className="text-zinc-500 text-sm leading-none">
          {isTruthy(fieldFormatData?.label)
            ? fieldFormatData.label
            : "Unknown format"}
        </span>
      </div>
    </div>
  );
}
