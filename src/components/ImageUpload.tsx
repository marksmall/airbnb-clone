"use client";

import { FC, useCallback } from "react";

import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";

import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}
// console.log("ENV VARS: ", process.env);
// if (!process.env.CLOUDINARY_UPLOAD_PRESET) {
//   throw Error("Set `Settings -> Upload presets` in cloudinary console and copy the Name as the Env Var");
// }

// const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
// This value must come from cloudinary
const uploadPreset = "ccngah93";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const ImageUpload: FC<Props> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image fill style={{ objectFit: "cover" }} src={value} alt="House" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
