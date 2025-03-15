import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlaygroundStore } from "@/stores/playground";
import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ColorCard } from "./live-preview/color-card";

import { tailwindColors } from "@/static/tailwind-colors";

const colors = Object.keys(tailwindColors);
const shades = [50, ...Array.from({ length: 9 }, (_, i) => (i + 1) * 100), 950];

export function BackgroundColorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { form, setBackground } = usePlaygroundStore();

  const [selectedColor, setSelectedColor] = useState(
    form.metadata.backgroundColor,
  );
  const [selectedShade, setSelectedShade] = useState(
    form.metadata.backgroundShade.toString(),
  );

  const handleSave = () => {
    setBackground({
      color: selectedColor,
      shade: parseInt(selectedShade),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-none tracking-tight">
            Customize background
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Customize the background color of the form with colors from the
            Tailwind CSS palette.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-5 w-5 rounded-sm`}
                      style={{ backgroundColor: tailwindColors[color][600] }}
                    />
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedShade} onValueChange={setSelectedShade}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select shade" />
            </SelectTrigger>
            <SelectContent>
              {shades.map((shade) => (
                <SelectItem key={shade} value={shade.toString()}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded-full`}
                      style={{
                        backgroundColor: tailwindColors[selectedColor][shade],
                      }}
                    />
                    {shade}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <ColorCard
            className="h-32 w-full"
            color={tailwindColors[selectedColor][parseInt(selectedShade)]}
            name="Selected color"
            description={`${selectedColor}-${selectedShade} (${tailwindColors[selectedColor][parseInt(selectedShade)]})`}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
