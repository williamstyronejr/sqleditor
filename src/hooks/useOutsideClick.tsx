import { useEffect, useRef, useCallback } from "react";

const useOutsideClick = ({
  active,
  closeEvent,
  ignoreButton = false,
  triggerKeys = ["Escape"],
}: {
  active: boolean;
  closeEvent: () => void;
  ignoreButton?: boolean;
  triggerKeys?: String[];
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClickEvent = useCallback(
    (evt: MouseEvent) => {
      if (ref && ref.current) {
        if (!ref.current.contains(evt.target as HTMLElement)) {
          if (ignoreButton) {
            if ((evt.target as HTMLElement).tagName !== "BUTTON") closeEvent();
          } else {
            closeEvent();
          }
        }
      }
    },
    [closeEvent, ignoreButton]
  );

  const onKeyEvent = useCallback(
    (evt: KeyboardEvent) => {
      if (triggerKeys.includes(evt.key)) {
        closeEvent();
      }
    },
    [closeEvent, triggerKeys]
  );

  useEffect(() => {
    if (active || active === undefined) {
      window.addEventListener("click", onClickEvent);
      window.addEventListener("keyup", onKeyEvent);

      return () => {
        window.removeEventListener("click", onClickEvent);
        window.removeEventListener("keyup", onKeyEvent);
      };
    }
  }, [onClickEvent, onKeyEvent, active]);

  return ref;
};

export default useOutsideClick;
