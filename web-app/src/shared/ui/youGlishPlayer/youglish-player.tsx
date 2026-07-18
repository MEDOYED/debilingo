import { useEffect } from "react";

interface Props {
  word: string;
}

export const YouGlishPlayer = ({ word }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://youglish.com/public/emb/widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const widgetId = `yg-widget-${Date.now()}`;

  return (
    <a
      id={widgetId}
      className="youglish-widget"
      data-query={encodeURIComponent(word)}
      data-lang="english"
      data-components="8415"
      data-bkg-color="theme_light"
      rel="nofollow"
      href="https://youglish.com"
    >
      Visit YouGlish.com
    </a>
  );
};
