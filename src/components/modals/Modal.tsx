"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";

import Button from "../Button";

const DURATION = 300;

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen, setShowModal]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => onClose(), DURATION);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full hg:h-auto md:h-auto">
          {/* Content */}
          <div
            className={`translate duration-${DURATION} h-full ${showModal ? "translate-y-0" : "translate-y-fll"} ${
              showModal ? "opactity-100" : "opacity-0"
            }`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <div className="text-lg font-semibold">{title}</div>

                <button className="p-1 border-0 hover:opacity-70 transition absolute right-9" onClick={handleClose}>
                  <IoMdClose size={18} />
                </button>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{children}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel ? (
                    <Button onClick={handleSecondaryAction} outline disabled={disabled}>
                      {secondaryActionLabel}
                    </Button>
                  ) : null}

                  <Button onClick={handleSubmit} disabled={disabled}>
                    {actionLabel}
                  </Button>
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
