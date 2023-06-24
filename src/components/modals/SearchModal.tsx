"use client";

import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { Range } from "react-date-range";

import { formatISO } from "date-fns";

import { useSearchModal } from "~/hooks/useSearchModal";

import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import Heading from "../Heading";
import DatePicker from "../DatePicker";
import Counter from "../Counter";

import Modal from "./Modal";

type LocationPanelProps = {
  location?: CountrySelectValue;
  setLocation: (value: CountrySelectValue) => void;
};

const LocationPanel: FC<LocationPanelProps> = ({ location, setLocation }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subTitle="Find the perfect location!" />
      <CountrySelect value={location} onChange={(value) => setLocation(value)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
};

type DatePanelProps = {
  dateRange: Range;
  setDateRange: Dispatch<SetStateAction<Range>>;
};

const DatePanel: FC<DatePanelProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="When do you plan to go?" subTitle="Make sure everyone is free!" />
      <DatePicker onChange={(value) => setDateRange(value.selection)} value={dateRange} />
    </div>
  );
};

type InfoPanelProps = {
  guestCount: number;
  setGuestCount: (count: number) => void;
  roomCount: number;
  setRoomCount: (count: number) => void;
  bathroomCount: number;
  setBathroomCount: (count: number) => void;
};

const InfoPanel: FC<InfoPanelProps> = ({
  guestCount,
  setGuestCount,
  roomCount,
  setRoomCount,
  bathroomCount,
  setBathroomCount,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="More information" subTitle="Find your perfect place!" />

      <Counter
        onChange={(value) => setGuestCount(value)}
        value={guestCount}
        title="Guests"
        subTitle="How many guests are coming?"
      />
      <hr />

      <Counter
        onChange={(value) => setRoomCount(value)}
        value={roomCount}
        title="Rooms"
        subTitle="How many rooms do you need?"
      />
      <hr />

      <Counter
        onChange={(value) => setBathroomCount(value)}
        value={bathroomCount}
        title="Bathrooms"
        subTitle="How many bathrooms do you need?"
      />
    </div>
  );
};

type BodyProps = {
  step: number;
  location?: CountrySelectValue;
  setLocation: (value: CountrySelectValue) => void;
  dateRange: Range;
  setDateRange: Dispatch<SetStateAction<Range>>;
  guestCount: number;
  setGuestCount: (count: number) => void;
  roomCount: number;
  setRoomCount: (count: number) => void;
  bathroomCount: number;
  setBathroomCount: (count: number) => void;
};

const Body: FC<BodyProps> = ({
  step,
  location,
  setLocation,
  dateRange,
  setDateRange,
  guestCount,
  setGuestCount,
  roomCount,
  setRoomCount,
  bathroomCount,
  setBathroomCount,
}) => {
  if (step === Steps.LOCATION) {
    return <LocationPanel location={location} setLocation={setLocation} />;
  } else if (step === Steps.DATE) {
    return <DatePanel dateRange={dateRange} setDateRange={setDateRange} />;
  } else if (step === Steps.INFO) {
    return (
      <InfoPanel
        guestCount={guestCount}
        setGuestCount={setGuestCount}
        roomCount={roomCount}
        setRoomCount={setRoomCount}
        bathroomCount={bathroomCount}
        setBathroomCount={setBathroomCount}
      />
    );
  }
};

type Props = {};

enum Steps {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const INITIAL_DATE_RANGE: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal: FC<Props> = ({}) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(Steps.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState(INITIAL_DATE_RANGE);

  const onBack = useCallback(() => setStep((prev) => prev - 1), []);

  const onNext = useCallback(() => setStep((prev) => prev + 1), []);

  const onSubmit = useCallback(async () => {
    if (step !== Steps.INFO) {
      return onNext();
    }

    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(Steps.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === Steps.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
    >
      <>
        <Body
          step={step}
          location={location}
          setLocation={setLocation}
          dateRange={dateRange}
          setDateRange={setDateRange}
          guestCount={guestCount}
          setGuestCount={setGuestCount}
          roomCount={roomCount}
          setRoomCount={setRoomCount}
          bathroomCount={bathroomCount}
          setBathroomCount={setBathroomCount}
        />
      </>
    </Modal>
  );
};

export default SearchModal;
