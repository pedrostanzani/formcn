"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePlaygroundStore } from "@/stores/playground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { CornerDownRight, Eye, Settings2, Shuffle } from "lucide-react";
import { ColorSelect } from "../colors/color-select";
import { ShadeSelect, shades } from "../colors/shade-select";
import { Label } from "../ui/label";
import { tailwindColors } from "@/static/tailwind-colors";
import { getTextColorBasedOnBackground } from "@/lib/utils";

const formSchema = z.object({
  buttonLabel: z.string().min(1, { message: "A button label is required" }),
  buttonColor: z.string(),
  buttonShade: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

export function EditSubmitButtonDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { form: formSpec, setMetadata } = usePlaygroundStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buttonLabel: formSpec.metadata.submitButton,
      buttonColor: formSpec.metadata.submitButtonColor,
      buttonShade: formSpec.metadata.submitButtonShade,
    },
  });

  const buttonLabel = form.watch("buttonLabel");
  const buttonColor = form.watch("buttonColor");
  const buttonShade = form.watch("buttonShade");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setMetadata({
      ...formSpec.metadata,
      submitButton: values.buttonLabel,
      submitButtonColor: values.buttonColor,
      submitButtonShade: values.buttonShade,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl leading-none tracking-tight">
            Customize submit button
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-3">
              <div className="w-1/2 space-y-2">
                <Button
                  type="button"
                  onClick={() => {
                    const randomColor =
                      Object.keys(tailwindColors)[
                        Math.floor(
                          Math.random() * Object.keys(tailwindColors).length,
                        )
                      ];
                    const randomShade =
                      shades[Math.floor(Math.random() * shades.length)];
                    form.setValue("buttonColor", randomColor);
                    form.setValue("buttonShade", randomShade);
                  }}
                  variant="outline"
                  className="group transition-colors"
                >
                  <Shuffle className="h-4 w-4 transition-colors" />
                  Shuffle style
                </Button>
                <Card className="flex flex-col items-center justify-center p-3">
                  <div className="flex items-center gap-1 self-start text-neutral-500 select-none">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium tracking-tighter uppercase">
                      Preview
                    </span>
                  </div>
                  <div className="pt-3">
                    <Button
                      className="transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor:
                          tailwindColors[buttonColor][buttonShade],
                        color: getTextColorBasedOnBackground(
                          tailwindColors[buttonColor][buttonShade],
                        ),
                      }}
                      type="button"
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                  <Alert className="bg-gray-200">
                    <CornerDownRight className="h-4 w-4" />
                    <AlertTitle>Your button will look like this!</AlertTitle>
                    <AlertDescription className="text-xs">
                      Feel free to adjust the look and feel so it perfectly
                      matches your brand and style.
                    </AlertDescription>
                  </Alert>
                </Card>
              </div>
              <div className="w-1/2 pt-11">
                <Card className="flex flex-col items-center justify-center gap-6 p-3">
                  <div className="flex items-center gap-1 self-start text-neutral-500 select-none">
                    <Settings2 className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium tracking-tighter uppercase">
                      Edit
                    </span>
                  </div>
                  <div className="w-full space-y-6">
                    <FormField
                      control={form.control}
                      name="buttonLabel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button label</FormLabel>
                          <FormControl>
                            <Input placeholder="Submit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-2">
                      <Label>Background color</Label>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <ColorSelect
                          value={buttonColor}
                          onValueChange={(value) =>
                            form.setValue("buttonColor", value)
                          }
                        />
                        <ShadeSelect
                          selectedColor={buttonColor}
                          value={buttonShade.toString()}
                          onValueChange={(value) =>
                            form.setValue("buttonShade", parseInt(value))
                          }
                        />
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" type="submit">
                      Save changes
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
