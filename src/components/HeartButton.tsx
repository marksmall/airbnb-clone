"use client";

import { FC } from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useFavorite } from "~/hooks/useFavorite";

import { SafeUser } from "../types/user";

type Props = {
  listingId: string;
  user?: SafeUser | null;
};

const HeartButton: FC<Props> = ({ listingId, user }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, user });

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`} />
    </div>
  );
};

export default HeartButton;
