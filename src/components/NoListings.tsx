"use client";

import { FC, MouseEvent } from "react";

import { useRouter } from "next/navigation";

import Button from "./Button";

type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

/* FIXME: This is actually duplicated in the RegisterModal */
const Heading: FC<HeadingProps> = ({ title, subTitle, center }) => (
  <div className={center ? "text-center" : "text-start"}>
    <div className="text-2xl font-bold">{title}</div>
    <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
  </div>
);

type Props = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

const NoListings: FC<Props> = ({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subTitle={subTitle} />

      <div className="w-48 mt-4">
        {showReset ? (
          <Button outline onClick={(event: MouseEvent<HTMLButtonElement>): void => router.push("/")}>
            Reset Filters
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default NoListings;
