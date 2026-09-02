import { memo } from "react";
import s from "./progress-bar.module.scss";

type ProgressBarProps = {
  progress: number;
};

const ProgressBarComponent = ({ progress }: ProgressBarProps) => {
  return (
    <div className={s.track}>
      <div
        className={s.indicator}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const ProgressBar = memo(ProgressBarComponent);
