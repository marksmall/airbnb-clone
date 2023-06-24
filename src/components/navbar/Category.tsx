"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

import { IconType } from "react-icons";

import qs, { Stringifiable } from "query-string";

type Props = {
  category: {
    label: string;
    icon: IconType;
    description: string;
  };
  selected?: boolean;
};

type LooseObject = {
  [key: string]: Stringifiable;
};

const Category: FC<Props> = ({ category, selected }) => {
  const { label, icon: Icon } = category;

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let updatedQuery: LooseObject = {
      ...currentQuery,
    };

    // FIXME: May need to add the label and remove, if it already exists. I don't like `delete xxxx` on object attributes, I find it really ugly.
    if (params?.get("category") !== label) {
      updatedQuery["category"] = label;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"
      }`}
      onClick={handleClick}
    >
      <Icon size={26} />

      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
