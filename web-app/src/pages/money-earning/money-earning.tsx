import { MoneyActivityCalendar } from "@widgets/money-activity-calendar";

import s from "./money-earning.module.scss";

export const MoneyEarning = () => {
  return (
    <div className="container">
      <MoneyActivityCalendar className={s.MoneyActivityCalendar} />
    </div>
  );
};
