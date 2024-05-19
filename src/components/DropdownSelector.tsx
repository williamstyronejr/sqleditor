"use client";

import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function DropDownSelector({
  selected,
  onSelect,
  options,
}: {
  selected: string;
  onSelect: (val: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick({
    active: isOpen,
    closeEvent: () => setIsOpen(false),
  });

  return (
    <div className="" ref={ref}>
      <button
        type="button"
        className="border-slate-300 border px-2 py-1 rounded-md"
        onClick={() => setIsOpen((old) => !old)}
      >
        {selected}
      </button>

      <div
        className={`${
          isOpen ? "flex flex-col flex-nowrap" : "hidden"
        } absolute  bg-white shadow-popup right-4 rounded-md z-50 text-left`}
      >
        {options.map((option) => (
          <button
            key={`drown-down-option-${option}`}
            className="pl-2 pr-4 text-left py-1 hover:bg-slate-400/10 disabled:text-slate-400 disabled:bg-slate-400/10"
            disabled={option === selected}
            onClick={() => {
              setIsOpen(false);
              onSelect(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
