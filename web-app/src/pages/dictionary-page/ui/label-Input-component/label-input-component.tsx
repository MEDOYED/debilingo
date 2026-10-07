import { useRef } from "react";

import { cn } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";
import { Clear, CopyPasteIcon, Trash } from "@shared/ui/icons";

import field from "@shared/styles/components/field.module.scss";
import s from "./label-input-component.module.scss";

interface IProps {
  labelText?: string;
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (index: number) => {
    const update = [...text];

    if (update[index] === "") {
      setText(text.length > 1 ? text.filter((_, i) => i !== index) : [""]);
    } else {
      update[index] = "";
      setText(update);
    }
  };

  const handlePaste = async (index: number) => {
    if (!inputRef.current) {
      return;
    }

    try {
      const pastedText = await navigator.clipboard.readText();

      inputRef.current.value = pastedText;

      if (text.length > 1) {
        const newTextsArr: string[] = text.map((textItem, i) =>
          i !== index ? textItem : pastedText
        );

        setText(newTextsArr);
      } else {
        setText([pastedText]);
      }
    } catch (error) {
      console.log(error);
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
            ref={inputRef}
          />

          <div className={s.actionButtonsWrapper}>
            <button
              type="button"
              className={s.pasteTextButton}
              onClick={() => handlePaste(index)}
            >
              <CopyPasteIcon />
            </button>

            {(text[index] !== "" || index !== 0) && (
              <button
                type="button"
                className={s.deleteInputButton}
                onClick={() => handleDelete(index)}
              >
                {text[index] ? <Clear /> : index !== 0 && <Trash />}
              </button>
            )}
          </div>
        </div>
      ))}
      <TextButton
        className={s.addInputButton}
        as="button"
        onClick={() => setText([...text, ""])}
      >
        {textInButton}
      </TextButton>
    </label>
  );
};
