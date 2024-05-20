"use client";

import { useRef } from "react";
import { useEffect } from "react";

export default function Diagram({ items }: { items: any[] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  const drawTable = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000";
    ctx.roundRect(20, 20, 100, 100, 4);
    ctx.fill();
  };

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    if (ctx) {
      drawTable(ctx);
    }
  }, [items]);

  return (
    <div className="flex flex-col flex-nowrap h-full w-full">
      <div className="h-12 bg-white shrink-0"> </div>

      <div className="grow">
        <canvas className="w-full h-full" ref={ref} />
      </div>
    </div>
  );
}
