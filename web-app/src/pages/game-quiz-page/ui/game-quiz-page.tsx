import { useState } from "react";

import type { GameScreen } from "@shared/types";
import { GAME_DURATIONS } from "@shared/config/games";
import { GameResultsScreen } from "@widgets/game-results-screen";

import { QuizGameScreen } from "./quiz-game-screen/quiz-game-screen";
import { SetupScreen } from "./setup-screen/setup-screen";

export const GameQuizPage = () => {
  const [screen, setScreen] = useState<GameScreen>("setup");
  const [selectedGameDuration, setSelectedGameDuration] = useState<number>(
    GAME_DURATIONS[0].value
  );
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string>("");

  return (
    <main>
      {screen === "setup" && (
        <SetupScreen
          selectedDictionaryId={selectedDictionaryId}
          selectedGameDuration={selectedGameDuration}
          onSelectDictionaryId={setSelectedDictionaryId}
          onSelectGameDuration={setSelectedGameDuration}
          onStartGame={() => setScreen("game")}
        />
      )}

      {screen === "game" && (
        <QuizGameScreen
          setScreen={setScreen}
          gameDurationInSeconds={selectedGameDuration}
          dictionaryId={selectedDictionaryId}
        />
      )}

      {screen === "results" && (
        <GameResultsScreen onPlayAgain={() => setScreen("game")} />
      )}
    </main>
  );
};
