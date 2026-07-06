import { TextButton } from "@shared/ui/buttons";
import s from "./label-input-component.module.scss";
import { cn } from "@shared/lib/styles";

interface IProps {
  classNameLabel: string;
  classNameInput: string;
  labelText: string;
  setText: (value: string[]) => void;
  text: string[];
  textInButton: string;
}

export const LabelInputComponent = ({
  classNameLabel,
  classNameInput,
  labelText,
  setText,
  text,
  textInButton,
}: IProps) => {
  return (
    <label
      className={classNameLabel}
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
            className={cn(classNameInput, s.input)}
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
