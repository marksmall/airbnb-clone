import { FC } from "react";

import Image from "next/image";

type Props = {
  src?: string | null;
};

const Avatar: FC<Props> = ({ src }) => {
  return <Image src={src ?? "/images/placeholder.svg"} width={30} height={30} alt="Avatar" className="rounded-full" />;
};

export default Avatar;
