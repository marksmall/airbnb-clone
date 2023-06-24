"use client";

import { FC, useCallback, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import toast from "react-hot-toast";

import { useRegisterModal, RegisterModalStore } from "~/hooks/useRegisterModal";
import { useLoginModal, LoginModalStore } from "~/hooks/useLoginModal";

import Modal from "~/components/modals/Modal";

import Button from "../Button";
import Input from "../Input";
import Heading from "../Heading";

type FooterProps = {
  loginModal: LoginModalStore;
  registerModal: RegisterModalStore;
};

const Footer: FC<FooterProps> = ({ loginModal, registerModal }) => {
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button outline icon={FcGoogle} onClick={() => signIn("google")}>
        Continue with Google
      </Button>
      <Button outline icon={AiFillGithub} onClick={() => signIn("github")}>
        Continue with Github
      </Button>

      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Create an Account
          </span>
        </p>
      </div>
    </div>
  );
};

type BodyProps = {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Body: FC<BodyProps> = ({ isLoading, register, errors }) => {
  return (
    <>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </>
  );
};

type Props = {};

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

const LoginModal: FC<Props> = ({}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: DEFAULT_VALUES });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      // secondaryActionLabel="Cancel"
      disabled={isLoading}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={<Footer loginModal={loginModal} registerModal={registerModal} />}
    >
      {/* Register form */}
      <>
        <div className="flex flex-col gap-4">
          <Heading title="Welcome back" subTitle="Login to your Account!" />

          <Body isLoading={isLoading} register={register} errors={errors} />
        </div>
      </>
    </Modal>
  );
};

export default LoginModal;
