import { cn } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";
import { Clear, Trash } from "@shared/ui/icons";

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
  const handleDelete = (index: number) => {
    const update = [...text];

    if (update[index] === "") {
      setText(text.length > 1 ? text.filter((_, i) => i !== index) : [""]);
    } else {
      update[index] = "";
      setText(update);
    }
  };

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
          <button
            type="button"
            className={s.deleteInputButton}
            onClick={() => handleDelete(index)}
          >
            {text[index] && text[index] !== "" ? (
              <Clear />
            ) : (
              index !== 0 && <Trash />
            )}
          </button>
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
