"use client";

import { useEffect, useRef, useState } from "react";
import VinikaReveal from "./VinikaReveal";

/** Critical assets preloaded before the page is revealed. */
const PRELOAD: string[] = [
  "/assets/logo-white.png",
  "/assets/logo-b.png",
  "/assets/vk-approach.jpg",
  "/assets/vk-story.jpg",
  "/assets/vk-method-0.jpg",
  "/assets/vk-method-1.jpg",
  "/assets/vk-method-2.jpg",
  "/assets/vk-insight-0.jpg",
  "/assets/vk-insight-1.jpg",
  "/assets/vk-insight-2.jpg",
  ...Array.from({ length: 9 }, (_, i) => `/assets/vk-strip-${i}.jpg`),
];

const MIN_MS = 2600; // never flash by faster than this
const MAX_MS = 8000; // hard safety: never trap the user

export default function Loader() {
  const [introDone, setIntroDone] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const mountedAt = useRef<number>(0);

  // stamp mount time once
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Lock scroll while the loader is up; ALWAYS release (to "") the moment it
  // starts leaving or unmounts. Restoring a captured previous value is unsafe —
  // under double-mount the "previous" value can be "hidden", which would leave
  // the page permanently unscrollable.
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (leaving || removed) {
      root.style.overflow = "";
      body.style.overflow = "";
      return;
    }
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [leaving, removed]);

  // preload images
  useEffect(() => {
    let done = 0;
    let cancelled = false;
    const finish = () => {
      done += 1;
      if (!cancelled && done >= PRELOAD.length) setImagesReady(true);
    };
    PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // hard safety timeout
  useEffect(() => {
    const t = setTimeout(() => {
      setIntroDone(true);
      setImagesReady(true);
    }, MAX_MS);
    return () => clearTimeout(t);
  }, []);

  // dismiss once intro finished AND images ready AND min time elapsed
  useEffect(() => {
    if (!introDone || !imagesReady) return;
    const elapsed = Date.now() - mountedAt.current;
    const wait = Math.max(0, MIN_MS - elapsed);
    const t1 = setTimeout(() => setLeaving(true), wait);
    return () => clearTimeout(t1);
  }, [introDone, imagesReady]);

  // after the fade, remove from the tree
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setRemoved(true), 800);
    return () => clearTimeout(t);
  }, [leaving]);

  if (removed) return null;

  return (
    <div
      aria-hidden={leaving}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "var(--navy)",
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
        transition: "opacity .8s cubic-bezier(.76,0,.24,1)",
        cursor: "default",
      }}
    >
      <VinikaReveal theme="dark" accent="#e0a045" onComplete={() => setIntroDone(true)} />
    </div>
  );
}
