import { memo, useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib/styles";
import { Microphone } from "@shared/ui/icons";

import s from "./word-typing-input.module.scss";

type SpeechRecognitionType = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start: () => void;
  stop: () => void;

  onresult: ((event: SpeechRecognitionEventType) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventType) => void) | null;
};

type SpeechRecognitionEventType = {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEventType = {
  error: string;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionType;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const WordTypingInputComponent = ({
  answer,
  setAnswer,
}: {
  answer: string;
  setAnswer: (value: React.SetStateAction<string>) => void;
}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setAnswer(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setError("Microphone permission was denied.");
        return;
      }

      setError("Something went wrong. Please try again.");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSpeech = () => {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    setError("");
    recognitionRef.current.start();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inputWrapper}>
        <input
          className={s.inputText}
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type the English word..."
        />

        <button
          type="button"
          onClick={handleSpeech}
          className={cn(s.recordBtn, isListening ? s.listening : "")}
        >
          <Microphone />
        </button>
      </div>

      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export const WordTypingInput = memo(WordTypingInputComponent);
