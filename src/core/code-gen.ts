import { FORM_SCHEMA_VARIABLE_NAME } from "./static/source-code";
import {
  Field,
  Form,
  StringFieldFormat,
  EnumFieldFormat,
  BooleanFieldFormat,
} from "./types";

// TODO:
// - Static array for combobox

function generateFieldSpecificImports(fields: Field[]) {
  let imports = "";
  const allFieldFormats = [...new Set(fields.map((field) => field.format))];

  allFieldFormats.forEach((format) => {
    switch (format) {
      case StringFieldFormat.Email:
      case StringFieldFormat.Input:
      case StringFieldFormat.Password:
        imports += `import { Input } from "@/components/ui/input";\n`;
        break;
      case StringFieldFormat.Textarea:
        imports += `import { Textarea } from "@/components/ui/textarea";\n`;
        break;

      case EnumFieldFormat.Radio:
        imports += `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";\n`;
        break;

      case EnumFieldFormat.Select:
        imports += `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";\n`;
        break;

      case EnumFieldFormat.Combobox:
        imports += `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";\n`;
        imports += `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"\n`;
        imports += `import { Check, ChevronsUpDown } from "lucide-react";\n`;
        imports += `import { cn } from "@/lib/utils";\n`;
        break;

      case BooleanFieldFormat.Checkbox:
        imports += `import { Checkbox } from "@/components/ui/checkbox";\n`;
        break;

      case BooleanFieldFormat.Switch:
        imports += `import { Switch } from "@/components/ui/switch";\n`;
        break;
    }
  });

  return imports;
}

export function generateSourceCode({
  schemaSourceCode,
  form,
}: {
  schemaSourceCode: string;
  form: Form;
}) {
  let sourceCode = "";

  // 1. Add "use client" directive
  sourceCode += '"use client";\n';

  // 2. Add imports
  sourceCode += `import { z } from "zod";\n`;
  sourceCode += `import { zodResolver } from "@hookform/resolvers/zod"\n`;
  sourceCode += `import { useForm } from "react-hook-form"\n`;
  sourceCode += `import { Form, FormControl, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"\n`;
  sourceCode += `import { Button } from "@/components/ui/button"\n`;
  sourceCode += generateFieldSpecificImports(form.fields);
  sourceCode += `\n`;

  // 3. Add Zod schema
  sourceCode += `${schemaSourceCode}\n\n`;

  // 4. Add React component function
  sourceCode += `export function ProfileForm() {\n`;
  sourceCode += `  const form = useForm<z.infer<typeof ${FORM_SCHEMA_VARIABLE_NAME}>>({\n`;
  sourceCode += `    resolver: zodResolver(${FORM_SCHEMA_VARIABLE_NAME}),\n`;
  sourceCode += `    defaultValues: {},\n`;
  sourceCode += `  }),\n`;
  sourceCode += `}\n`;

  console.log(sourceCode);
  return sourceCode;
}
