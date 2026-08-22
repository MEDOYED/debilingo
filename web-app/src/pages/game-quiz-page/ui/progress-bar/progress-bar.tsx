import s from "./progress-bar.module.scss";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={s.track}>
      <div
        className={s.indicator}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
