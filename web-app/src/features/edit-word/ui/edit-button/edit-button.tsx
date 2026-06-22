import { Edit } from "@shared/ui/icons";

import { useSwipeWordStore, useWordStore } from "@entities/word";

import type { Word } from "@entities/word";

import s from "./edit-button.module.scss";

type EditButtonProps = {
  id: Word["id"];
};

export const EditButton = ({ id }: EditButtonProps) => {
  const { setEditableWordId, setOpenWordId, setStatus } = useWordStore();
  const { setShiftX } = useSwipeWordStore();

  const handleEditWord = () => {
    setEditableWordId(id);
    setOpenWordId(id);
    setStatus("opening");
    setTimeout(() => setStatus("expanded"), 500);
    setShiftX(0);
  };

  return (
    <button
      className={s.editBtn}
      onClick={handleEditWord}
    >
      <Edit size={36} />
    </button>
  );
};
