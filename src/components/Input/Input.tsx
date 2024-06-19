"use client";

import { ChangeEventHandler, FC, useState } from "react";
import { font } from "@/src/infra/font";

type InputProps = {
  value: string;
  onInputEnd: (finalValue: string) => Promise<void>;
  required?: boolean;
  as?: "input" | "textarea";
  className?: string;
} & Record<string, any>;

export const Input: FC<InputProps> = ({
  value: propsValue,
  onInputEnd,
  required: isRequired,
  as: Tag = "input",
  className,
  ...passThroughProps
}) => {
  const [value, setValue] = useState(propsValue);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const newValue = event.target.value;
    if (!isRequired || (isRequired && newValue)) {
      setValue(newValue);
    }
  };
  const handleBlur = () => {
    onInputEnd(value);
  };

  return (
    <Tag
      className={`${className} ${font.className}`}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...passThroughProps}
    />
  );
};
