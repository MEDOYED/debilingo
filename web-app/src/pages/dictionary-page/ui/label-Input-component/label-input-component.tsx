import { useRef } from "react";

import { cn } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";
import { Clear, CopyPasteIcon, Trash } from "@shared/ui/icons";

import field from "@shared/styles/components/field.module.scss";
import s from "./label-input-component.module.scss";

interface IProps {
  labelText?: string;
  setText: (value: string[]) => void;
  texts: string[];
  textInButton: string;
}

export const LabelInputComponent = ({
  labelText,
  setText,
  texts,
  textInButton,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (index: number) => {
    const update = [...texts];

    if (update[index] === "") {
      setText(texts.length > 1 ? texts.filter((_, i) => i !== index) : [""]);
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

      if (texts.length > 1) {
        const newTextsArr: string[] = texts.map((textItem, i) =>
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
      {texts.map((value, index) => (
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
              if (texts.length === 0) return;
              const update = [...texts];
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

            {(texts[index] !== "" || index !== 0) && (
              <button
                type="button"
                className={s.deleteInputButton}
                onClick={() => handleDelete(index)}
              >
                {texts[index] ? <Clear /> : index !== 0 && <Trash />}
              </button>
            )}
          </div>
        </div>
      ))}
      <TextButton
        className={s.addInputButton}
        as="button"
        onClick={() => setText([...texts, ""])}
      >
        {textInButton}
      </TextButton>
    </label>
  );
};
