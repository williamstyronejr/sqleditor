import { ReactNode } from "react";

export default function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="absolute z-20 top-0 left-0 flex flex-row flex-nowrap w-full h-full items-center justify-center">
      <div
        className="absolute bg-black/20 h-full w-full -z-10"
        onClick={onClose}
      />

      <div className="w-80 shadow-lg">{children}</div>
    </div>
  );
}
