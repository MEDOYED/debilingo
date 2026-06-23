import type { Word } from "@entities/word";
import {
  useAddWordStore,
  useSwipeWordStore,
  useWordStore,
} from "@entities/word";
import { Edit } from "@shared/ui/icons";

import { useEditWordStore } from "../../model/use-edit-word-store";

type EditButtonProps = {
  id: Word["id"];
  className?: string;
};

export const EditButton = ({ id, className }: EditButtonProps) => {
  const { setEditableWordId, setOpenWordId, setStatus } = useWordStore();
  const { setShiftX } = useSwipeWordStore();
  const { words } = useAddWordStore();

  const { initDrafts } = useEditWordStore();

  const editableWord = words.find((word) => word.id === id);

  const handleEditWord = () => {
    if (!editableWord) return;

    setEditableWordId(id);
    setOpenWordId(id);
    setStatus("opening");
    setTimeout(() => setStatus("expanded"), 500);
    setShiftX(0);
    initDrafts(editableWord);
  };

  return (
    <button
      className={className}
      onClick={handleEditWord}
    >
      <Edit size={36} />
    </button>
  );
};
