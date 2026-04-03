import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib/styles";

// import { useLanguageRowStore } from "@pages/dictionary-page/model/use-language-row-store";
import s from "./spoiler.module.scss";

interface SpoilerProps {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
}

export const Spoiler = ({ children, className = "",isVisible }: SpoilerProps) => {
  // const { isMainLanguageColVisible } = useLanguageRowStore();

  const [isIndividuallyRevealed, setIsIndividuallyRevealed] = useState(false);

  const revealed = /*(isMainLanguageColVisible */ isVisible || isIndividuallyRevealed;

  // const [revealed, setRevealed] = useState(isMainLanguageColVisible);

  // useEffect(() => {
  //   if (isMainLanguageColVisible) {
  //     setIsIndividuallyRevealed(false);
  //   }
  // }, [isMainLanguageColVisible]);

  console.log("revealed: ", revealed);

  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      nextChange: number;
    }>
  >([]);

  const createParticles = (width: number, height: number) => {
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      nextChange: number;
    }> = [];
    const numParticles = Math.max(20, Math.floor((width * height) / 40));

    for (let i = 0; i < numParticles; i++) {
      const speed = Math.random() * 0.1 + 0.05;
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 1.8 + 0.9,
        nextChange: Date.now() + Math.random() * 2200 + 900,
      });
    }
    particlesRef.current = particles;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const now = Date.now();
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#2a2a2a";
    ctx.clearRect(0, 0, w, h);
    // ctx.fillRect(0, 0, w, h);

    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Random chaotic direction change
      if (now > p.nextChange) {
        const speed = Math.random() * 0.1;
        const angle = Math.random() * Math.PI * 2;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.nextChange = now + Math.random() * 2300 + 700;
      }

      ctx.fillStyle = "rgb(177 203 208)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Resize + start animation
  useEffect(() => {
    if (revealed) return;

    const container = containerRef.current;
    if (!container) return;

    const resizeAndInit = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      createParticles(rect.width, rect.height);
    };

    resizeAndInit();

    const observer = new ResizeObserver(resizeAndInit);
    observer.observe(container);

    // Start animation
    animate();

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [revealed]);

  const handleClick = () => {
    if (isVisible) return; // Клік працює тільки коли глобально приховано
    if (revealed) return; // Якщо вже відкрито - нічого не робимо

    setIsIndividuallyRevealed(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <span
      ref={containerRef}
      onClick={handleClick}
      style={{
        cursor: revealed ? "default" : "pointer",
        userSelect: revealed ? "auto" : "none",
      }}
      className={cn(s.spoiler, className)}
    >
      {!revealed && (
        <canvas
          ref={canvasRef}
          className={s.canvasSpoilerOverlay}
        />
      )}

      <span
        style={{
          position: "relative",
          zIndex: 2,
          filter: revealed ? "none" : "blur(4px)",
          transition: "filter 0.35s ease",
          color: revealed ? "inherit" : "transparent",
        }}
      >
        {children}
      </span>
    </span>
  );
};
