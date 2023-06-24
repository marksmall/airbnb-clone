import { FC } from "react";

type Props = {
};

const HomePage: FC<Props> = () => {
  return (
      <div className="grid grid-cols-1 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        Home Page
      </div>
  );
};

export default HomePage;
