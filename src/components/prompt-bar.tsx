"use client";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Link from "next/link";
import { Play, ArrowUp, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import { usePlaygroundStore } from "@/stores/playground";
import { Form as FormSpecType } from "@/core/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";
import { AuthDialog } from "./auth/auth-dialog";
import { useState } from "react";

const formSchema = z.object({
  prompt: z.string().min(1),
});

export function PromptBar() {
  const { data: session } = useSession();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { setForm } = usePlaygroundStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const prompt = form.watch("prompt");
  const isSubmitting = form.formState.isSubmitting;

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      setAuthDialogOpen(true);
      return;
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      if (response.status === 401) {
        setAuthDialogOpen(true);
      } else {
        toast.error(
          "It was not possible to generate the form. Please try again later.",
        );
      }
    } else {
      const data = await response.json();
      setForm(data as FormSpecType);
      router.push("/playground");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative h-32 w-full rounded-2xl bg-white p-4 pt-3.5 pb-0"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    disabled={isSubmitting}
                    placeholder="What do you want to build?"
                    rows={3}
                    className="h-full w-full resize-none rounded-lg p-2 pb-3.5 outline-0 placeholder:text-zinc-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={prompt.trim().length === 0 || isSubmitting}
            className="absolute right-4 bottom-4 flex size-7 items-center justify-center transition-colors disabled:bg-zinc-200 disabled:opacity-100"
            size="icon"
          >
            {isSubmitting ? <Spinner className="size-4" /> : <ArrowUp />}
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
        <Button
          asChild
          variant="outline"
          disabled={prompt.length !== 0 || isSubmitting}
          className="group flex items-center gap-2 transition-all [&_svg:not([class*='size-'])]:size-3"
        >
          <Link
            className={cn(
              prompt.length !== 0 && "pointer-events-none opacity-50",
            )}
            href="/playground?template=birthday"
          >
            Birthday invite template
            <PartyPopper
              size={8}
              className="text-red-500 group-hover:text-red-600"
            />
          </Link>
        </Button>

        <Button
          asChild
          variant="default"
          disabled={prompt.length !== 0 || isSubmitting}
          className="flex items-center gap-2 transition-all [&_svg:not([class*='size-'])]:size-3"
        >
          <Link
            className={cn(
              prompt.length !== 0 && "pointer-events-none opacity-50",
            )}
            href="/playground"
          >
            Or, get started without AI
            <Play size={8} className="fill-white" />
          </Link>
        </Button>
      </div>
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <AuthDialog />
      </Dialog>
    </>
  );
}
