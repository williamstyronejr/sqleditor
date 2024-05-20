"use client";

import { useState, ReactNode } from "react";
import Modal from "./Modal";

const ConfirmModal = ({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!visible) return null;

  return <Modal onClose={onClose}>{children}</Modal>;
};

export default function ConfirmationButton({
  message,
  onConfirm,
  children,
}: {
  message: string;
  children: ReactNode;
  onConfirm: () => void;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="">
      <button
        type="button"
        className="border border-slate-300 rounded-md p-1"
        onClick={() => setActive((old) => !old)}
      >
        {children}
      </button>

      <ConfirmModal visible={active} onClose={() => setActive(false)}>
        <div className="px-2 py-4 rounded-md bg-white">
          <div className="pt-4 pb-6">{message}</div>

          <div className="flex flex-row flex-nowrap w-full justify-center">
            <button
              type="button"
              className="px-4 py-1 mr-2 bg-red-500 text-white rounded-md"
              onClick={onConfirm}
            >
              Confirm
            </button>

            <button
              type="button"
              className="px-4 py-1 bg-slate-300 rounded-md"
              onClick={() => setActive(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
}
