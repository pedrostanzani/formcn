import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FormPreview({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={cn("flex min-h-96 flex-1 items-center justify-center px-4 text-center", className)}>
      <p className="max-w-72 text-sm text-zinc-500">
        Add fields to the form to get started and then visualize the form
        preview.
      </p>
    </Card>
  );
}
