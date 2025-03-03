import { z } from "zod";
import { Field, FieldType, StringFieldFormat, WithId } from "./types";

export function generateFieldKey(fieldId: number) {
  return `field_${fieldId}`;
}

function parseField(field: WithId<Field>) {
  switch (field.type) {
    case FieldType.String:
      if (field.format === StringFieldFormat.Email) {
        return {
          fieldZodSchema: field.required
            ? z.string().email()
            : z.string().email().optional(),
          propValueInSourceCode: field.required
            ? `z.string().email()`
            : `z.string().email().optional()`,
          defaultValue: "",
        };
      } else {
        return {
          fieldZodSchema: field.required
            ? z.string().min(1)
            : z.string().optional(),
          propValueInSourceCode: field.required
            ? `z.string().min(1)`
            : `z.string().optional()`,
          defaultValue: "",
        };
      }

    case FieldType.Enum:
      return {
        fieldZodSchema: z.string(),
        propValueInSourceCode: `z.string()`,
        defaultValue: "",
      };
  }

  return null;
}

export function generateFormZodSchema(fields: WithId<Field>[]) {
  const defaultValues: Record<string, any> = {};
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  const schemaSourceKeyValues: Record<string, string> = {};

  fields.forEach((field) => {
    const key = generateFieldKey(field.id);

    const parsedField = parseField(field);
    if (!parsedField) return;

    const { fieldZodSchema, defaultValue, propValueInSourceCode } = parsedField;
    schemaShape[key] = fieldZodSchema;
    defaultValues[key] = defaultValue;
    schemaSourceKeyValues[key] = propValueInSourceCode;
  });

  const schemaSourceCode =
    `const formSchema = z.object({\n` +
    Object.entries(schemaSourceKeyValues)
      .map(([key, value]) => `  ${key}: ${value},`)
      .join("\n") +
    `\n});`;

  return {
    formSchema: z.object(schemaShape),
    schemaSourceCode: schemaSourceCode,
    defaultValues,
  };
}
