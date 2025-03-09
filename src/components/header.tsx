import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tagline } from "./tagline";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { extractInitials } from "@/lib/utils";
import { SignOut } from "./auth/sign-out";
import { AuthDialog } from "./auth/auth-dialog";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e5e5] bg-[#e4e4e4]/95 px-4 py-5 backdrop-blur supports-[backdrop-filter]:bg-[#e4e4e4]/60 md:px-6 md:py-7">
      <div>
        <Link className="flex items-center gap-1.5" href="/">
          <MousePointerClick className="h-6 w-6 fill-amber-500" />
          <span className="text-xl leading-none font-bold tracking-tight select-none">
            formcn
          </span>
        </Link>
      </div>
      <Tagline />
      <div className="absolute right-4 md:right-6">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-0.5 ring-0 transition-colors outline-none hover:bg-zinc-300">
                <Avatar>
                  <AvatarImage src={session.user?.image ?? undefined} />
                  <AvatarFallback>
                    {extractInitials(session.user?.name ?? "")}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <SignOut />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="rounded-xl bg-neutral-300 transition-colors hover:bg-neutral-300/80"
              >
                Sign in
              </Button>
            </DialogTrigger>
            <AuthDialog />
          </Dialog>
        )}
      </div>
    </header>
  );
}
