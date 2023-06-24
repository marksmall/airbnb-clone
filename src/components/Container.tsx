import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return <div className="max-w-[]2520px] mx-auto xl:px20 md:px-10 sm:px-2 px-4">{children}</div>;
};

export default Container;
