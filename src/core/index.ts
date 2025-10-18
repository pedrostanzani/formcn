import { z } from "zod";
import { EnumFieldFormat, Field, FieldType, StringFieldFormat, WithIdAndKey } from "./types";
import { FORM_SCHEMA_VARIABLE_NAME } from "./static/source-code";

export function generateFieldKey(fieldId: number) {
  return `field_${fieldId}`;
}

function parseField(field: WithIdAndKey<Field>) {
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
      if (field.format === EnumFieldFormat.Radio) {
        const options = field.options.map((option) => option.value) as [string, ...string[]];
        
        return {
          fieldZodSchema: z.enum(options),
          propValueInSourceCode: `z.enum(${JSON.stringify(options)})`,
          defaultValue: undefined,
        }
      }

      return {
        fieldZodSchema: z.string(),
        propValueInSourceCode: `z.string()`,
        defaultValue: "",
      };

    case FieldType.Boolean:
      return {
        fieldZodSchema: z.boolean().default(false),
        propValueInSourceCode: `z.boolean().default(false)`,
        defaultValue: false,
      };
  }

  return null;
}

export function generateFormZodSchema(fields: WithIdAndKey<Field>[]) {
  const defaultValues: Record<string, any> = {};
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  const schemaSourceKeyValues: Record<string, string> = {};

  fields.forEach((field) => {
    const parsedField = parseField(field);
    if (!parsedField) return;

    const { fieldZodSchema, defaultValue, propValueInSourceCode } = parsedField;
    schemaShape[field.key] = fieldZodSchema;
    defaultValues[field.key] = defaultValue;
    schemaSourceKeyValues[field.key] = propValueInSourceCode;
  });

  const schemaSourceCode =
    `const ${FORM_SCHEMA_VARIABLE_NAME} = z.object({\n` +
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
