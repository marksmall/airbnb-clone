"use client";

import { FC, useCallback, useState } from "react";

import { signIn } from "next-auth/react";

import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useRegisterModal, RegisterModalStore } from "~/hooks/useRegisterModal";
import { useLoginModal, LoginModalStore } from "~/hooks/useLoginModal";

import Modal from "~/components/modals/Modal";

import Button from "../Button";
import Input from "../Input";
import Heading from "../Heading";

type FooterProps = {
  registerModal: RegisterModalStore;
  loginModal: LoginModalStore;
};

const Footer: FC<FooterProps> = ({ registerModal, loginModal }) => {
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
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
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
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
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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
  name: "",
  email: "",
  password: "",
};

const RegisterModal: FC<Props> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: DEFAULT_VALUES });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const content = await response.json();

    if (!response.ok) {
      // Not okay
      console.log("Error: ", { message: content, statusText: response.statusText });
      toast.error(content);
    }

    registerModal.onClose();

    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={<Footer registerModal={registerModal} loginModal={loginModal} />}
    >
      {/* Register form */}
      <>
        <div className="flex flex-col gap-4">
          <Heading title="Welcome to my Airbnb Clone" subTitle="Create an Account!" />

          <Body isLoading={isLoading} register={register} errors={errors} />
        </div>
      </>
    </Modal>
  );
};

export default RegisterModal;
