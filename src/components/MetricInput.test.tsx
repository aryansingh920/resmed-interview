// MetricInput.tsx (make it accessible)
type Props = {
  id?: string;
  label: string;
  type?: "number" | "date" | "text";
  value?: string | number;
  min?: number;
  step?: number;
  onChange: (v: number | string | undefined) => void;
};

export default function MetricInput({
  id,
  label,
  type = "number",
  value,
  min = 0,
  step = 1,
  onChange,
}: Props) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="input" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        type={type}
        value={value ?? ""}
        min={type === "number" ? min : undefined}
        step={type === "number" ? step : undefined}
        onChange={(e) => {
          const v =
            type === "number"
              ? e.currentTarget.value === ""
                ? undefined
                : Number(e.currentTarget.value)
              : e.currentTarget.value;
          onChange(v);
        }}
        aria-label={label}
      />
    </label>
  );
}
