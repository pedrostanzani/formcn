"use client";
import { Button } from "@/components/ui/button";
import { FormFieldSearchableList } from "@/components/form-fields/form-field-searchable-list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function NewFieldDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const closeDialog = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add new field</Button>
        </DialogTrigger>
        <DialogContent className="flex h-[80vh] flex-col overflow-y-scroll px-0 sm:max-w-[768px]">
          <DialogHeader className="gap-1.5 px-6">
            <DialogTitle className="text-2xl leading-none tracking-tight">
              Add new field
            </DialogTitle>
            <DialogDescription>
              What field would you like to add to your form?
            </DialogDescription>
          </DialogHeader>
          <FormFieldSearchableList closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} autoFocus={open}>
      <DrawerTrigger asChild>
        <Button>Add new field</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-2 overflow-y-scroll">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl leading-none tracking-tight">
              Add new field
            </DrawerTitle>
            <DrawerDescription>
              What field would you like to add to your form?
            </DrawerDescription>
          </DrawerHeader>
          <FormFieldSearchableList closeDialog={closeDialog} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
