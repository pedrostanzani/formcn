"use client";
import { Button } from "@/components/ui/button";
import { FormFieldSearchableList } from "@/components/form-field-searchable-list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function NewFieldDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add new field</Button>
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
        <FormFieldSearchableList />
      </DialogContent>
    </Dialog>
  );
}
