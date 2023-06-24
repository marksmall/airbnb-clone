"use client";

import { FC, useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";

import { useLoginModal } from "~/hooks/useLoginModal";
import { useRegisterModal } from "~/hooks/useRegisterModal";
import { useRentModal } from "~/hooks/useRentModal";

import { SafeUser } from "~/types/user";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

type Props = {
  user?: SafeUser | null;
};

const UserMenu: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const toggleUserMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const onRent = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, user]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleUserMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <p className="p-2 flex flex-col items-center">{user ? user.name : null}</p>
          <hr />
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                {" "}
                <MenuItem label="My trips" onClick={() => router.push("/trips")} />
                <MenuItem label="My favorites" onClick={() => router.push("/favorites")} />
                <MenuItem label="My reservations" onClick={() => router.push("/reservations")} />
                <MenuItem label="My properties" onClick={() => router.push("/properties")} />
                <MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
