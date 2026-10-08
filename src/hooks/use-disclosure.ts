import { useCallback, useState } from "react";

interface IDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (value: boolean) => void;
}

const useDisclosure = (initialState = false): IDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const set = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, open, close, toggle, set };
};

export default useDisclosure;
