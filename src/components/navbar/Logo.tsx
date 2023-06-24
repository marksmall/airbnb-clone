"use client";

import { FC } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Logo: FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.svg"
      width={100}
      height={100}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
