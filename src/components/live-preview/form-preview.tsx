import { useState } from "react";
import { Settings2 } from "lucide-react";

import { usePlaygroundStore } from "@/stores/playground";
import { generateFormZodSchema } from "@/core";
import { cn } from "@/lib/utils";

import { FormDemo } from "./form-demo";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FormPreview({ className }: { className?: string }) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const { form, nextFieldId } = usePlaygroundStore();
  const { formSchema, defaultValues } = generateFormZodSchema(form.fields);

  if (form.fields.length === 0) {
    return (
      <Card
        className={cn(
          "flex min-h-96 flex-1 items-center justify-center px-4 text-center",
          className,
        )}
      >
        <p className="max-w-72 text-sm text-zinc-500">
          Start adding fields to the form to get started and then visualize the
          form preview.
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("relative min-h-96 px-4", className)}>
      <FormDemo
        key={nextFieldId}
        formSchema={formSchema}
        defaultValues={defaultValues}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-4 right-4"
              variant="outline"
              size="icon"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Customize form</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
}
