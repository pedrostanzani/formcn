"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormFieldSearchableList } from "@/components/form-field-searchable-list";

export function NewFieldButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add new field</Button>
      </DialogTrigger>
      <DialogContent
        className="flex h-[80vh] flex-col px-0 sm:max-w-[768px]"
      >
        <DialogHeader className="flex-shrink-0 gap-1.5 px-6">
          <DialogTitle className="text-2xl leading-none tracking-tight">
            Add new field
          </DialogTitle>
          <DialogDescription>
            What field would you like to add to your form?
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <FormFieldSearchableList />
        </div>
      </DialogContent>
    </Dialog>
  );
}
