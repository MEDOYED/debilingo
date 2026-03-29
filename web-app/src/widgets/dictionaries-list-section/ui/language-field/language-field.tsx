import { cn } from "@shared/lib/styles";

// styles
import field from "../../styles/field.module.scss";

type NameFieldProps = {
  onChange: (newName: string) => void;
  value: string;
  variant: "main" | "secondary";
  className?: string;
};

export const LanguageField = ({
  onChange,
  value,
  variant,
  className,
}: NameFieldProps) => {
  return (
    <label className={cn(field.label, className)}>
      {variant === "main" ? "Головна мова" : "Другорядна мова"}
      <input
        className={field.input}
        type="text"
        placeholder={variant === "main" ? "english" : "ukrainian"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
