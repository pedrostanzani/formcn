import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInWithGitHub } from "@/components/auth/sign-in";

export function Header() {
  return (
    <header className="relative flex items-center justify-between px-4 py-5 md:py-8 md:px-6">
      <div className="flex items-center gap-1.5">
        <MousePointerClick className="h-6 w-6 fill-amber-500" />
        <span className="text-xl leading-none font-bold tracking-tight select-none">
          formcn
        </span>
      </div>
      <p className="absolute left-1/2 hidden -translate-x-1/2 transform text-center font-medium tracking-tight text-balance text-zinc-500 md:block">
        Build beautiful forms with shadcn/ui, React Hook Form and Zod
      </p>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="cursor-pointer rounded-xl bg-neutral-300 transition-colors hover:bg-neutral-300/80"
            >
              Sign in
            </Button>
          </DialogTrigger>
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
                  className="h-12 w-full cursor-pointer transition-colors"
                >
                  Back
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
