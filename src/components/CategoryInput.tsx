"use client";

import { FC } from "react";

import { Category } from "./navbar/CategoryList";

type Props = {
  category: Category;
  selected?: boolean;
  onClick: (value: string) => void;
};

const CategoryInput: FC<Props> = ({ category, selected, onClick }) => {
  const { icon: Icon, label } = category;

  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }
      `}
    >
      <Icon size={30} />

      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
