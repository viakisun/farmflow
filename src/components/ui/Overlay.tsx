import { memo } from "react";

type Props = {
  open: boolean;
  onClick?: () => void;
};

const Overlay = memo(function Overlay({ open, onClick }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className="fixed inset-0 z-40 bg-black/40 transition-opacity"
    />
  );
});

export default Overlay;
