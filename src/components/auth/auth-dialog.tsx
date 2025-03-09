import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInWithGitHub } from "./sign-in-with-github";

export function AuthDialog() {
  return (
    <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
      <DialogHeader>
        <div className="flex items-center justify-between gap-1">
          <DialogTitle className="text-2xl tracking-tight">
            Sign in to formcn
          </DialogTitle>
          <MousePointerClick className="h-7 w-7 fill-amber-500" />
        </div>
      </DialogHeader>
      <div className="grid gap-2 pt-4">
        <SignInWithGitHub />
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full transition-colors"
          >
            Back
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
