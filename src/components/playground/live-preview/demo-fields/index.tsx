import { Field, FieldType, WithIdAndKey } from "@/core/types";
import { StringDemoField } from "./string-demo-field";
import { EnumDemoField } from "./enum-demo-field";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import { BooleanDemoField } from "./boolean-demo-field";

export function DemoField({
  field,
  formControl,
  form,
}: {
  field: WithIdAndKey<Field>;
  formControl: Control<FieldValues> | undefined;
  form: UseFormReturn<FieldValues, any, undefined>;
}) {
  switch (field.type) {
    case FieldType.String:
      return <StringDemoField field={field} formControl={formControl} />;

    case FieldType.Enum:
      return (
        <EnumDemoField field={field} formControl={formControl} form={form} />
      );

    case FieldType.Boolean:
      return (
        <BooleanDemoField field={field} form={form} />
      );

    default:
      break;
  }

  return null;
}
