import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewFieldDialog } from "./new-field-dialog";

export function FormFields() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold tracking-tight">
          Getting started
        </CardTitle>
        <CardDescription className="max-w-md">
          formcn helps you build forms with shadcn/ui, React Hook Form and Zod.
          Add a new field to get started!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <NewFieldDialog />
          <Button
            variant="outline"
            className="cursor-pointer [&_svg:not([class*='size-'])]:size-3.5"
          >
            Create form with AI <Sparkles />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
