import { cn } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";

import field from "@shared/styles/components/field.module.scss";
import s from "./label-input-component.module.scss";

interface IProps {
  labelText: string;
  setText: (value: string[]) => void;
  text: string[];
  textInButton: string;
}

export const LabelInputComponent = ({
  labelText,
  setText,
  text,
  textInButton,
}: IProps) => {
  return (
    <label
      className={field.label}
      htmlFor=""
    >
      <div className={s.textAndButton}>{labelText}</div>
      {text.map((value, index) => (
        <div
          key={index}
          className={s.textAndButton}
        >
          <input
            key={index}
            className={cn(field.input, s.input)}
            type="text"
            value={value || ""}
            onChange={(e) => {
              if (text.length === 0) return;
              const update = [...text];
              update[index] = e.target.value;
              setText(update);
            }}
          />
          <TextButton
            className={s.deleteInputButton}
            as="button"
            onClick={() =>
              setText(
                text.length > 1 ? text.filter((_, i) => i !== index) : [""]
              )
            }
          >
            -
          </TextButton>
        </div>
      ))}
      <TextButton
        className={s.addInputButton}
        as="button"
        onClick={() => setText([...text, ""])}
      >
        + {textInButton}
      </TextButton>
    </label>
  );
};
