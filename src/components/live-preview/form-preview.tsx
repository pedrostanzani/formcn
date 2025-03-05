import { useState } from "react";
import { Paintbrush, PaintBucket, Trash2 } from "lucide-react";

import { usePlaygroundStore } from "@/stores/playground";
import { generateFormZodSchema } from "@/core";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormDemo } from "./form-demo";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";
import { BackgroundColorPicker } from "./background-color-picker";
import { z } from "zod";

export function FormPreview({
  className,
  formSchema,
  defaultValues,
}: {
  className?: string;
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
}) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [backgroundDialogOpen, setBackgroundDialogOpen] = useState(false);

  const { form, nextFieldId, setShowBackground } = usePlaygroundStore();

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
    <Card className={cn("relative min-h-96 overflow-hidden py-0", className)}>
      <FormDemo
        key={nextFieldId}
        formSchema={formSchema}
        defaultValues={defaultValues}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute right-4 bottom-4"
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
      </TooltipProvider> */}
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className={cn(
                    "absolute top-28 right-4",
                    !form.metadata.showBackground && "top-5",
                  )}
                  variant="outline"
                  size="icon"
                >
                  <PaintBucket className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <TooltipContent side="left">
              <p>Customize background</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" className="w-56">
          {form.metadata.showBackground ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setBackgroundDialogOpen(true)}
                className="cursor-pointer"
              >
                <Paintbrush />
                Change color
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowBackground(false)}
                className="group cursor-pointer"
              >
                <Trash2 className="text-zinc-500 transition-colors group-hover:text-red-600" />
                Remove background
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setShowBackground(true)}
                className="group cursor-pointer"
              >
                <Paintbrush />
                Add background
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={backgroundDialogOpen}
        onOpenChange={setBackgroundDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl leading-none tracking-tight">
              Customize background
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
              Customize the background color of the form with colors from the
              Tailwind CSS palette.
            </DialogDescription>
          </DialogHeader>
          <BackgroundColorPicker
            closeDialog={() => setBackgroundDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
