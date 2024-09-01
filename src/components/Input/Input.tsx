"use client";

import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { font } from "@/src/infra/font";
import s from "./Input.module.scss";

type InputProps = {
  value: string;
  onInputEnd: (finalValue: string) => Promise<void>;
  required?: boolean;
  as?: "input" | "textarea";
  className?: string;
  maxHeight?: number;
} & Record<string, any>;

export const Input: FC<InputProps> = ({
  value: propsValue,
  onInputEnd,
  required: isRequired,
  as: Tag = "input",
  className,
  maxHeight = 500,
  ...passThroughProps
}) => {
  const [value, setValue] = useState(propsValue);
  const ref = useRef<any>(null);

  const scaleInput = () => {
    if (Tag !== "textarea" || !ref.current) {
      return;
    }
    const element = ref.current as HTMLInputElement;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
    if (element.scrollHeight > maxHeight) {
      element.style.overflowY = "scroll";
    }
  };
  useEffect(() => {
    scaleInput();
  }, [ref.current, value]);

  const handleChange: ChangeEventHandler<any> = (event) => {
    const newValue = event.target.value;
    if (!isRequired || (isRequired && newValue)) {
      setValue(newValue);
    }
  };
  const handleBlur = () => {
    const newValue = value.trim();
    setValue(newValue);
    onInputEnd(newValue);
  };

  return (
    <Tag
      ref={ref}
      className={`${s.input} ${className} ${font.className}`}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onInput={Tag === "textarea" ? scaleInput : undefined}
      {...passThroughProps}
    />
  );
};
