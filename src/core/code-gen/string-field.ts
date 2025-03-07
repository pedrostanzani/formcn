import { isTruthy } from "@/lib/utils";
import { StringField, StringFieldFormat, WithIdAndKey } from "../types";

function generateStringInputComponentSourceCode(
  field: WithIdAndKey<StringField>,
) {
  let stringInputComponentSourceCode = "";

  switch (field.format) {
    case StringFieldFormat.Input:
      stringInputComponentSourceCode += `<Input ${
        isTruthy(field.placeholder) && field.placeholder !== ""
          ? `placeholder="${field.placeholder}"`
          : ``
      } {...field} />\n`;
      break;

    case StringFieldFormat.Email:
      stringInputComponentSourceCode += `<Input type="email" ${
        isTruthy(field.placeholder) && field.placeholder !== ""
          ? `placeholder="${field.placeholder}"`
          : ``
      } {...field} />\n`;
      break;

    case StringFieldFormat.Password:
      stringInputComponentSourceCode += `<Input type="password" ${
        isTruthy(field.placeholder) && field.placeholder !== ""
          ? `placeholder="${field.placeholder}"`
          : ``
      } {...field} />\n`;
      break;

    case StringFieldFormat.Textarea:
      stringInputComponentSourceCode += `<Textarea ${
        isTruthy(field.placeholder) && field.placeholder !== ""
          ? `placeholder="${field.placeholder}"`
          : ``
      } {...field} />\n`;
      break;

    default:
      break;
  }

  return stringInputComponentSourceCode;
}

export function generateStringFieldSourceCode(
  field: WithIdAndKey<StringField>,
) {
  let stringFieldSourceCode = "";

  stringFieldSourceCode += `<FormField\n`;
  stringFieldSourceCode += `  control={form.control}\n`;
  stringFieldSourceCode += `  name="${field.key}"\n`;
  stringFieldSourceCode += `  render={({ field }) => (\n`;
  stringFieldSourceCode += `    <FormItem>\n`;

  if (field.label) {
    stringFieldSourceCode += `      <FormLabel>${field.label}</FormLabel>\n`;
  }

  stringFieldSourceCode += `      <FormControl>\n`;
  stringFieldSourceCode += generateStringInputComponentSourceCode(field);
  stringFieldSourceCode += `      </FormControl>\n`;
  stringFieldSourceCode += `      <FormMessage />\n`;
  stringFieldSourceCode += `    </FormItem>\n`;
  stringFieldSourceCode += `  )}\n`;
  stringFieldSourceCode += `/>\n`;

  return stringFieldSourceCode;
}
