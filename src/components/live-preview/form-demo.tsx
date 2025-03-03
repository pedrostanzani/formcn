import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldValues, useForm, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { usePlaygroundStore } from "@/stores/playground";
import { Button } from "../ui/button";
import { DemoField } from "./demo-fields";

type FormDemoProps = {
  formSchema: z.ZodObject<
    Record<string, z.ZodTypeAny>,
    "strip",
    z.ZodTypeAny,
    {
      [x: string]: any;
    },
    {
      [x: string]: any;
    }
  >;
  defaultValues: Record<string, any>;
  formValues: Record<string, any>;
  setFormValues: (values: Record<string, any>) => void;
};

export const FormDemo: React.FC<FormDemoProps> = ({
  formSchema,
  defaultValues,
  formValues,
  setFormValues,
}) => {
  const { form: formSpec } = usePlaygroundStore();

  // When we insert a new field, the key (which is the nextFieldId) passed to FormDemo is incremented.
  // This causes the form to be recreated with new values.
  // This is a problem because the form state is lost.
  // To fix this, we merge the default values with the form values.
  // Form values are the values that the user has entered in the form. They are stored in the formValues object.
  // They are kept in sync with the form state by the useEffect hook below.
  const mergedValues = { ...defaultValues, ...formValues };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mergedValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // This useEffect hook is used to keep the form values in sync with the form state.
  // When the form values change, the form state is updated.
  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          {formSpec.metadata.heading !== "" && (
            <h1 className="mb-1.5 text-3xl font-bold tracking-tight">
              {formSpec.metadata.heading}
            </h1>
          )}
          {formSpec.metadata.description !== "" && (
            <p className="text-base text-zinc-500">
              {formSpec.metadata.description}
            </p>
          )}
        </div>
        <div className="space-y-4">
          {formSpec.fields.map((field) => (
            <DemoField key={field.id} field={field} />
          ))}
        </div>
        <Button type="submit">
          {formSpec.metadata.submitButton === ""
            ? "Submit"
            : formSpec.metadata.submitButton}
        </Button>
      </form>
    </Form>
  );
};
