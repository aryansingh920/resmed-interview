import React from "react";
type Props = {
  label: string;
  value: number | undefined;
  onChange: (n: number | undefined) => void;
  min?: number;
  step?: number;
  placeholder?: string;
};
export default function MetricInput({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  placeholder,
}: Props) {
  return (
    <label className="input">
      <span>{label}</span>
      <input
        type="number"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.currentTarget.value;
          onChange(v === "" ? undefined : Math.max(min, Number(v)));
        }}
        step={step}
        min={min}
      />
    </label>
  );
}
