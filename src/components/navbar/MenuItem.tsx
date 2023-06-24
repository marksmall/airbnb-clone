"use client";

import { FC } from "react";

type Props = {
  label: string;
  onClick: () => void;
};

const MenuItem: FC<Props> = ({ label, onClick }) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={onClick}>
      {label}
    </div>
  );
};

export default MenuItem;
