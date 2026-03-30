import { useModalNavigationStore } from "./model/use-modal-navigation-store";

import { Link } from "react-router-dom";
import s from "./modal-navigation.module.scss";

const navigationData = [
  {
    text: "Головна",
    to: "",
  },
  {
    text: "Словники",
    to: "/dictionary",
  },
  {
    text: "Тренування",
    to: "/training",
  },
  {
    text: "Рейтинги",
    to: "/rating",
  },
];

export const ModalNavigation = () => {
  const { closeNavModal, isOpenNavModal } = useModalNavigationStore();

  if (!isOpenNavModal) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button onClick={closeNavModal}>X</button>

        <ul>
          {navigationData.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
