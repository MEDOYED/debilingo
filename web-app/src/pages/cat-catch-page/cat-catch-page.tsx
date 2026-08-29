import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useCatCatchStore } from "./model/use-cat-catch-store";
import { CameraViewfinder } from "./ui/camera-viewfinder/camera-viewfinder";
import { CatPreviewCard } from "./ui/cat-preview-card/cat-preview-card";
import { CatchForm } from "./ui/catch-form/catch-form";

import s from "./cat-catch-page.module.scss";

export const CatCatchPage = () => {
  const { step, resetCatch, name, rarity } = useCatCatchStore();

  useEffect(() => {
    return () => {
      // cleanup when unmounting if not saved
    };
  }, []);

  return (
    <main className={s.pageContainer}>
      <header className={s.topBar}>
        <Link to="/cats/map" className={s.backLink}>
          ← До карти
        </Link>
        <h1 className={s.pageTitle}>📸 Ловля котика</h1>
        <Link to="/cats/collection" className={s.collectionLink}>
          📚 Колекція
        </Link>
      </header>

      <div className={s.contentWrapper}>
        {step === "camera" && (
          <section className={s.cameraSection}>
            <div className={s.instructionBox}>
              <span className={s.icon}>🎯</span>
              <p className={s.text}>
                Наведіть камеру на кота та натисніть круглу кнопку нижче
              </p>
            </div>
            <CameraViewfinder />
          </section>
        )}

        {step === "preview" && (
          <section className={s.previewSection}>
            <div className={s.previewGrid}>
              <div className={s.cardCol}>
                <CatPreviewCard />
              </div>
              <div className={s.formCol}>
                <CatchForm />
              </div>
            </div>
          </section>
        )}

        {step === "success" && (
          <section className={s.successSection}>
            <div className={s.successCard}>
              <div className={s.confettiIcon}>🎉</div>
              <h2 className={s.successTitle}>Успішно спіймано!</h2>
              <p className={s.successSubtitle}>
                Котик <strong>&quot;{name}&quot;</strong> ({rarity}) успішно доданий до
                вашої персональної колекції та розміщений на карті!
              </p>

              <div className={s.successActions}>
                <Link to="/cats/map" className={s.mapBtn} onClick={resetCatch}>
                  🗺️ Відкрити на карті
                </Link>
                <Link
                  to="/cats/collection"
                  className={s.collectionBtn}
                  onClick={resetCatch}
                >
                  📚 Переглянути колекцію
                </Link>
                <button
                  type="button"
                  className={s.catchMoreBtn}
                  onClick={resetCatch}
                >
                  📸 Спіймати ще одного!
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
