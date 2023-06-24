"use client";

import { FC, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { useForm, FieldValues, FieldErrors, UseFormRegister, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";

import { useRentModal } from "~/hooks/useRentModal";

import { CATEGORIES } from "../navbar/CategoryList";

import Input from "../Input";
import Counter from "../Counter";
import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import ImageUpload from "../ImageUpload";
import CategoryInput from "../CategoryInput";

import Modal from "./Modal";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

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

type CategoryPanelProps = {
  category: string;
  setCustomValue: (key: string, value: string) => void;
};

const CategoryPanel: FC<CategoryPanelProps> = ({ category, setCustomValue }) => (
  <div className="flex flex-col gap-8">
    <Heading title="Which of these best describes your place?" subTitle="Pick a category" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
      {CATEGORIES.map((cat) => (
        <div key={cat.label} className="col-span-1">
          <CategoryInput
            category={cat}
            onClick={(categoryLabel) => setCustomValue("category", categoryLabel)}
            selected={category === cat.label}
          />
        </div>
      ))}
    </div>
  </div>
);

type LocationPanelProps = {
  location: CountrySelectValue;
  setCustomValue: (key: string, value: CountrySelectValue) => void;
};

const LocationPanel: FC<LocationPanelProps> = ({ location, setCustomValue }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Where is your place located?" subTitle="Help guests find you!" />

      <CountrySelect value={location} onChange={(value: CountrySelectValue) => setCustomValue("location", value)} />

      <Map center={location?.latlng} />
    </div>
  );
};

type InfoPanelProps = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (key: string, value: number) => void;
};

const InfoPanel: FC<InfoPanelProps> = ({ guestCount, roomCount, bathroomCount, setCustomValue }) => (
  <div className="flex flex-col gap-8">
    <Heading title="Share some basics about your place" subTitle="What amenitis do you have?" />

    <Counter
      onChange={(value) => setCustomValue("guestCount", value)}
      value={guestCount}
      title="Guests"
      subTitle="How many guests do you allow?"
    />

    <hr />

    <Counter
      onChange={(value) => setCustomValue("roomCount", value)}
      value={roomCount}
      title="Rooms"
      subTitle="How many rooms do you have?"
    />

    <hr />

    <Counter
      onChange={(value) => setCustomValue("bathroomCount", value)}
      value={bathroomCount}
      title="Bathrooms"
      subTitle="How many bathrooms do you have?"
    />
  </div>
);

type ImagesPanelProps = {
  imageSrc: string;
  setCustomValue: (key: string, value: string) => void;
};

const ImagesPanel: FC<ImagesPanelProps> = ({ imageSrc, setCustomValue }) => (
  <div className="flex flex-col gap-8">
    <Heading title="Add a photo of your place" subTitle="Show guests what your place looks like!" />

    <ImageUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
  </div>
);

type DescriptionPanelProps = {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const DescriptionPanel: FC<DescriptionPanelProps> = ({ isLoading, register, errors }) => (
  <div className="flex flex-col gap-8">
    <Heading title="How would you describe your place?" subTitle="Short and sweet works best!" />

    <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />

    <hr />

    <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
  </div>
);

type PricePanelProps = {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const PricePanel: FC<PricePanelProps> = ({ isLoading, register, errors }) => (
  <div className="flex flex-col gap-8">
    <Heading title="Now, set your price" subTitle="How much do you charge per night?" />

    <Input
      id="price"
      label="Price"
      formatPrice
      type="number"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
  </div>
);

type BodyProps = {
  step: number;
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  location: CountrySelectValue;
  imageSrc: string;
  category: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: any;
};

const Body: FC<BodyProps> = ({
  step,
  isLoading,
  register,
  errors,
  location,
  imageSrc,
  category,
  guestCount,
  roomCount,
  bathroomCount,
  setCustomValue,
}) => {
  if (step === Steps.CATEGORY) {
    return <CategoryPanel category={category} setCustomValue={setCustomValue} />;
  } else if (step === Steps.LOCATION) {
    return <LocationPanel location={location} setCustomValue={setCustomValue} />;
  } else if (step === Steps.INFO) {
    return (
      <InfoPanel
        guestCount={guestCount}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
        setCustomValue={setCustomValue}
      />
    );
  } else if (step === Steps.IMAGES) {
    return <ImagesPanel imageSrc={imageSrc} setCustomValue={setCustomValue} />;
  } else if (step === Steps.DESCRIPTION) {
    return <DescriptionPanel isLoading={isLoading} register={register} errors={errors} />;
  } else if (step === Steps.PRICE) {
    return <PricePanel isLoading={isLoading} register={register} errors={errors} />;
  }
};

type Props = {};

const DEFAULT_VALUES = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const RentModal: FC<Props> = ({}) => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== Steps.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    const response = await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error("Something went wrong");
    }

    toast.success("Listing created!");
    router.refresh();
    reset();
    setStep(Steps.CATEGORY);
    rentModal.onClose();
    setIsLoading(false);
  };

  const actionLabel = useMemo(() => {
    if (step === Steps.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        <Body
          step={step}
          isLoading={isLoading}
          register={register}
          errors={errors}
          location={location}
          imageSrc={imageSrc}
          category={category}
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
          setCustomValue={setCustomValue}
        />
      </>
    </Modal>
  );
};

export default RentModal;
