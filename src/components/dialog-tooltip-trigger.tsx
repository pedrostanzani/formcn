import { DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DialogTooltipTriggerProps {
  tooltip: string;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
}

export function DialogTooltipTrigger({
  tooltip,
  children,
  side = "top",
}: DialogTooltipTriggerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
        </DialogTrigger>
        <TooltipContent side={side}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
