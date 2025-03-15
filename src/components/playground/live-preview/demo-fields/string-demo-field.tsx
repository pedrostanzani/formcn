import { Control, FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { StringField, StringFieldFormat, WithIdAndKey } from "@/core/types";

export function StringDemoField({
  field: fieldSpec,
  formControl,
}: {
  field: WithIdAndKey<StringField>;
  formControl: Control<FieldValues> | undefined;
}) {
  return (
    <FormField
      control={formControl}
      name={fieldSpec.key}
      render={({ field }) => (
        <FormItem>
          {fieldSpec.label && <FormLabel>{fieldSpec.label}</FormLabel>}
          <FormControl>
            {fieldSpec.format === StringFieldFormat.Input ? (
              <Input placeholder={fieldSpec.placeholder} {...field} />
            ) : fieldSpec.format === StringFieldFormat.Textarea ? (
              <Textarea placeholder={fieldSpec.placeholder} {...field} />
            ) : fieldSpec.format === StringFieldFormat.Email ? (
              <Input
                type="email"
                placeholder={fieldSpec.placeholder}
                {...field}
              />
            ) : (
              <Input
                type="password"
                placeholder={fieldSpec.placeholder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
