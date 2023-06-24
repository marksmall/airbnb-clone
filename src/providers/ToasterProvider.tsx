"use client";

import { FC } from "react";

import { Toaster } from "react-hot-toast";

type Props = {};

const ToasterProvider: FC<Props> = ({}) => {
  return <Toaster />;
};

export default ToasterProvider;
