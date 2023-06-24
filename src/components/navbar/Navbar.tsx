import { FC, Suspense } from "react";

import { SafeUser } from "../../types/user";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import CategoryList from "./CategoryList";

type Props = {
  user?: SafeUser | null;
};

const Navbar: FC<Props> = ({ user }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Suspense fallback={<div>Loading Search Component...</div>}>
              <Search />
            </Suspense>
            <UserMenu user={user} />
          </div>
        </Container>
      </div>

      <Suspense fallback={<div>Loading CategoryList component...</div>}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default Navbar;
