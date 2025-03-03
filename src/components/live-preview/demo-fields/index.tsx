import { Field, FieldType, WithId } from "@/core/types";
import { StringDemoField } from "./string-demo-field";
import { EnumDemoField } from "./enum-demo-field";

export function DemoField({ field }: { field: WithId<Field> }) {
  switch (field.type) {
    case FieldType.String:
      return <StringDemoField field={field} />;

    case FieldType.Enum:
      return <EnumDemoField field={field} />;

    default:
      break;
  }

  return null;
}
