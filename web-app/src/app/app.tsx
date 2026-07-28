import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import "./styles/app.scss";

import { useEffect } from "react";

import { useState } from "react";

import { useVoicesStore } from "@shared/stores/use-voices-store";

function App() {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  const { setVoices } = useVoicesStore();

  // initial app loading
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      let isMounted = true;

      const voices = synth.getVoices();
      if (voices.length > 0) {
        setIsAppLoading(false);
        setVoices(synth.getVoices());
      }

      // if withing 2sec voiceschanged event doesn't work - disable app loader
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setIsAppLoading(false);
          setVoices(voices);
        }
      }, 2000);

      const handleVoiceChanged = () => {
        synth.getVoices();
        if (isMounted) {
          setIsAppLoading(false);
          clearTimeout(timeoutId);
          setVoices(synth.getVoices());
        }
      };

      if (synth.onvoiceschanged !== undefined) {
        synth.addEventListener("voiceschanged", handleVoiceChanged);
      }

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        if (synth.onvoiceschanged !== undefined) {
          synth.removeEventListener("voiceschanged", handleVoiceChanged);
        }
      };
    }

    setIsAppLoading(false);
  }, []);

  if (isAppLoading) {
    return (
      <>
        <div>Loading all data...</div>
      </>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
