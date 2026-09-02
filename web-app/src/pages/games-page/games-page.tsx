import { Link } from "react-router-dom";

import quizImage from "./assets/images/quiz-game.png";
import wordTypingImage from "./assets/images/word-typing.png";

import s from "./games-page.module.scss";

export const GamesPage = () => {
  const GAME_LINKS = [
    {
      name: "Quiz",
      description:
        "Choose the correct translation from four options and test your vocabulary.",
      link: "/games/quiz",
      image: quizImage,
    },
    {
      name: "Word Typing",
      description:
        "Translate the word by typing or saying the answer in English.",
      link: "/games/word-typing",
      image: wordTypingImage,
    },
  ];
  return (
    <main className={s.container}>
      <h1 className={s.mainText}>All Games</h1>
      <div className={s.linksContainer}>
        {GAME_LINKS.map((game) => (
          <Link
            className={s.card}
            to={game.link}
          >
            <div className={s.imageWrapper}>
              <img
                src={game.image}
                alt=""
                className={s.image}
              />
            </div>
            <div className={s.gameNameAndDescriptionContainer}>
              <h3 className={s.gameName}>{game.name}</h3>
              <p className={s.gameDescription}>{game.description}</p>
              <button className={s.gameBtn}>Play</button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
