import { useEffect, useRef, useState, useCallback } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async (mode: "environment" | "user" = facingMode) => {
    stopStream();
    setError(null);
    setIsReady(false);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Камера не підтримується цим браузером");
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsReady(true);
        };
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.warn("Camera start failed, falling back to simple video:", errorObj);
      try {
        // Fallback with basic constraints
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsReady(true);
          };
        }
      } catch (fallbackErr) {
        console.error("Camera access denied:", fallbackErr);
        setError("Не вдалося отримати доступ до камери. Використайте кнопку завантаження фото.");
      }
    }
  }, [facingMode, stopStream]);

  const toggleFacingMode = useCallback(() => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  }, [facingMode, startCamera]);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // If front camera, mirror image
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      stopStream();
    };
  }, []);

  return {
    videoRef,
    isReady,
    error,
    facingMode,
    startCamera,
    stopStream,
    toggleFacingMode,
    captureFrame,
  };
};
