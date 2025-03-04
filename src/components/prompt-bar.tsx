"use client";
import { useState } from "react";
import Link from "next/link";
import { Play, ArrowUp, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PromptBar() {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <div className="relative h-32 w-full rounded-2xl bg-white p-4 pt-3.5 pb-0">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to build?"
          className="h-full w-full resize-none rounded-lg p-2 pb-4 outline-0 placeholder:text-zinc-500"
        />
        <Button
          disabled={prompt.length === 0}
          className="absolute right-4 bottom-4 size-7 transition-colors disabled:bg-zinc-200 disabled:opacity-100"
          size="icon"
        >
          <ArrowUp />
        </Button>
      </div>
      <div className="mt-4 flex flex-col items-center sm:flex-row gap-2">
        <Button
          asChild
          variant="outline"
          disabled={prompt.length !== 0}
          className="group flex items-center gap-2 transition-all [&_svg:not([class*='size-'])]:size-3"
        >
          <Link
            className={cn(
              prompt.length !== 0 && "pointer-events-none opacity-50",
            )}
            href="/playground?template=birthday"
          >
            Birthday invite template
            <PartyPopper size={8} className="text-red-500 group-hover:text-red-600" />
          </Link>
        </Button>

        <Button
          asChild
          variant="default"
          disabled={prompt.length !== 0}
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
    </>
  );
}
