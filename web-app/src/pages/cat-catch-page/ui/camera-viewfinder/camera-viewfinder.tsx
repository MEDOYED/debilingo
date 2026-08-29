import { useRef } from "react";
import type { ChangeEvent } from "react";
import { useCamera } from "../../hooks/use-camera";
import { useCurrentLocation } from "../../hooks/use-current-location";
import { compressImageFile } from "../../hooks/use-image-compressor";
import { useCatCatchStore } from "../../model/use-cat-catch-store";
import { GpsStatusBadge } from "../gps-status-badge/gps-status-badge";
import s from "./camera-viewfinder.module.scss";

export const CameraViewfinder = () => {
  const { videoRef, error, toggleFacingMode, captureFrame } = useCamera();
  useCurrentLocation(); // ensure GPS is fetched
  const { initCaptureWithPhoto } = useCatCatchStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  // Capture frame directly from live video element
  const handleLiveSnap = () => {
    const frame = captureFrame();
    if (frame) {
      initCaptureWithPhoto(frame);
    } else {
      // If live stream frame couldn't be captured, trigger native camera
      nativeCameraInputRef.current?.click();
    }
  };

  // Handle image selected from gallery or native mobile camera
  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const compressed = await compressImageFile(files[0]);
        initCaptureWithPhoto(compressed);
      } catch (err) {
        console.error("Error compressing file:", err);
      }
    }
  };

  return (
    <div className={s.viewfinderContainer}>
      <div className={s.headerBar}>
        <GpsStatusBadge />
      </div>

      <div className={s.cameraFrame}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={s.videoElement}
        />

        {/* Viewfinder crosshairs / focus reticle */}
        <div className={s.reticle}>
          <div className={`${s.corner} ${s.topLeft}`}></div>
          <div className={`${s.corner} ${s.topRight}`}></div>
          <div className={`${s.corner} ${s.bottomLeft}`}></div>
          <div className={`${s.corner} ${s.bottomRight}`}></div>
          <div className={s.centerCatIcon}>🐱</div>
        </div>

        {error && (
          <div className={s.fallbackOverlay}>
            <p className={s.fallbackText}>{error}</p>
            <button
              type="button"
              className={s.nativeCameraBtn}
              onClick={() => nativeCameraInputRef.current?.click()}
            >
              📸 Відкрити камеру телефону
            </button>
          </div>
        )}
      </div>

      {/* Hidden inputs for native mobile camera & gallery */}
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={s.hiddenInput}
        onChange={handleFileSelected}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={s.hiddenInput}
        onChange={handleFileSelected}
      />

      {/* Camera Controls Footer */}
      <div className={s.controlsBar}>
        <button
          type="button"
          className={s.secondaryBtn}
          onClick={() => fileInputRef.current?.click()}
          title="Завантажити з галереї"
          aria-label="Галерея"
        >
          🖼️ <span className={s.btnLabel}>Галерея</span>
        </button>

        <button
          type="button"
          className={s.shutterButton}
          onClick={handleLiveSnap}
          aria-label="Зробити фото котика"
          title="Спіймати кота"
        >
          <div className={s.shutterInner}>
            <span className={s.shutterCat}>🐾</span>
          </div>
        </button>

        <button
          type="button"
          className={s.secondaryBtn}
          onClick={toggleFacingMode}
          title="Перемкнути камеру"
          aria-label="Змінити камеру"
        >
          🔄 <span className={s.btnLabel}>Камера</span>
        </button>
      </div>
    </div>
  );
};
