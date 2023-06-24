import { FC } from "react";

import { Range } from "react-date-range";

import Button from "~/components/Button";
import DatePicker from "~/components/DatePicker";

type Props = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  reservedDates: Date[];
  disabled?: boolean;
};

const ListingReservation: FC<Props> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  reservedDates,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>

        <div className="font-light text-neutral-600">per night</div>
      </div>

      <hr />

      <DatePicker value={dateRange} reservedDates={reservedDates} onChange={(value) => onChangeDate(value.selection)} />

      <hr />

      <div className="p-4">
        <Button onClick={onSubmit} disabled={disabled}>
          Reserve
        </Button>
      </div>

      <hr />

      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
