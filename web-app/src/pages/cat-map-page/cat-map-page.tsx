import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useCatMapStore } from "./model/use-cat-map-store";
import { CatMapTopBar } from "./ui/cat-map-top-bar/cat-map-top-bar";
import { CatMapView } from "./ui/cat-map-view/cat-map-view";
import { CatDetailsModal } from "./ui/cat-details-modal/cat-details-modal";
import { CatEmptyBanner } from "./ui/cat-empty-banner/cat-empty-banner";

import s from "./cat-map-page.module.scss";

export const CatMapPage = () => {
  const { cats, isLoading, loadCats } = useCatMapStore();

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  return (
    <main className={s.container}>
      <CatMapTopBar />

      <div className={s.mapContainer}>
        <CatMapView />

        {/* Floating Catch Action Button (MD3 Expressive FAB) */}
        <Link
          to="/cats/catch"
          className={s.fabButton}
          aria-label="Спіймати кота"
        >
          <span className={s.fabIcon}>📸</span>
          <span className={s.fabText}>Спіймати кота</span>
        </Link>

        {/* Empty state banner when 0 cats caught */}
        {!isLoading && cats.length === 0 && <CatEmptyBanner />}
      </div>

      <CatDetailsModal />
    </main>
  );
};
