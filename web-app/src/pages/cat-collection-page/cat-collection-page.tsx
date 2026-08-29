import { useEffect } from "react";

import { useCatCollection } from "./hooks/use-cat-collection";
import { CatStatsHeader } from "./ui/cat-stats-header/cat-stats-header";
import { CatFilters } from "./ui/cat-filters/cat-filters";
import { CatCard } from "./ui/cat-card/cat-card";
import { CatDetailsModal } from "./ui/cat-details-modal/cat-details-modal";
import { EmptyCollection } from "./ui/empty-collection/empty-collection";

import s from "./cat-collection-page.module.scss";

export const CatCollectionPage = () => {
  const { cats, totalCount, isLoading, loadData } = useCatCollection();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <main className={s.pageContainer}>
      <div className={s.contentWrapper}>
        <CatStatsHeader />

        {totalCount > 0 && <CatFilters />}

        {isLoading ? (
          <div className={s.loadingBox}>
            <span className={s.loadingCat}>🐾</span>
            <p className={s.loadingText}>Завантажуємо котиків...</p>
          </div>
        ) : cats.length > 0 ? (
          <section className={s.catsGrid} aria-label="Список спійманих котів">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </section>
        ) : (
          <EmptyCollection isFiltered={totalCount > 0} />
        )}
      </div>

      <CatDetailsModal />
    </main>
  );
};
