import React from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: any;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  onClick = () => {},
  className,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "hover:opacity-80 transition-opacity cursor-pointer select-none",
        className
      )}
    >
      {children}
    </div>
  );
}
 