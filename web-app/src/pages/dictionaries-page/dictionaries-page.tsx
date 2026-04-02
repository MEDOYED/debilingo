import { DictionariesListSection } from "@widgets/dictionaries-list-section";

import { Outlet } from "react-router-dom";

export const DictionariesPage = () => {
  return (
    <main>
      <DictionariesListSection />

      <Outlet />
    </main>
  );
};
