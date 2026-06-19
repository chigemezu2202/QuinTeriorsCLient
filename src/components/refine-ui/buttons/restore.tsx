"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type RestoreButtonProps = {
  onRestore: () => void;
};

export function RestoreButton({
  onRestore,
}: RestoreButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onRestore}
    >
      <RotateCcw className="h-4 w-4 mr-2" />
      Restore
    </Button>
  );
}