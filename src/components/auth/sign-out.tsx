"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";

export function SignOut() {
  return (
    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
      <LogOut />
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
