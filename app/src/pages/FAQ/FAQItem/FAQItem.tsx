import { Blockquote } from "@radix-ui/themes";
import React from "react";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="flex flex-col gap-2 ml-2">
      <Blockquote>{q}</Blockquote>
      <Blockquote color="gray" style={{ color: "#d6d5d5" }}>
        {a}
      </Blockquote>
    </div>
  );
}
