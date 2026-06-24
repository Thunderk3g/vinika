"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Card = { cat: string; title: string; tint: string };

/** Brand-recolored orbital cards (services = amber, case studies = teal, insights = sand). */
const CARDS: Card[] = [
  { cat: "SERVICE", title: "Brand Strategy", tint: "#e0a045" },
  { cat: "SERVICE", title: "Business Consulting", tint: "#e0a045" },
  { cat: "SERVICE", title: "Market Expansion", tint: "#e0a045" },
  { cat: "SERVICE", title: "Growth Advisory", tint: "#e0a045" },
  { cat: "SERVICE", title: "Digital Transformation", tint: "#e0a045" },
  { cat: "CASE STUDY", title: "Retail Expansion", tint: "#6db3bd" },
  { cat: "CASE STUDY", title: "Manufacturing Growth", tint: "#6db3bd" },
  { cat: "CASE STUDY", title: "Healthcare Positioning", tint: "#6db3bd" },
  { cat: "CASE STUDY", title: "SaaS Retention", tint: "#6db3bd" },
  { cat: "INSIGHT", title: "Market Trends 2026", tint: "#e8c79a" },
  { cat: "INSIGHT", title: "Brand Building Guide", tint: "#e8c79a" },
];

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const wd of words) {
    const test = line ? line + " " + wd : wd;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = wd;
      yy += lh;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let unmounted = false;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    const dpr = window.devicePixelRatio || 1;
    // Lower the pixel-ratio cap on small/mobile screens to cut GPU fill cost.
    renderer.setPixelRatio(Math.min(dpr, window.innerWidth <= 768 ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 0, 12.5);
    const group = new THREE.Group();
    scene.add(group);

    const W = 2.3;
    const H = 1.45;
    const radius = 6.4;

    function makeTexture(card: Card) {
      const c = document.createElement("canvas");
      const w = 560;
      const h = 350;
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d")!;
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#0e2f5e");
      g.addColorStop(1, "#07223f");
      roundRect(ctx, 6, 6, w - 12, h - 12, 30);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(245,225,200,0.16)";
      ctx.stroke();
      ctx.fillStyle = card.tint;
      roundRect(ctx, 40, 44, 58, 9, 4);
      ctx.fill();
      ctx.fillStyle = card.tint;
      ctx.font = "600 24px 'Geist Mono', ui-monospace, monospace";
      ctx.fillText(card.cat, 40, 104);
      ctx.fillStyle = "#f5e1c8";
      ctx.font = "600 50px Geist, system-ui, sans-serif";
      wrapText(ctx, card.title, 40, 188, w - 80, 56);
      ctx.fillStyle = "rgba(245,225,200,0.5)";
      ctx.font = "500 22px Geist, system-ui, sans-serif";
      ctx.fillText("Explore →", 40, h - 44);
      const tex = new THREE.CanvasTexture(c);
      const maxAniso = renderer.capabilities.getMaxAnisotropy?.();
      if (maxAniso) tex.anisotropy = maxAniso;
      tex.needsUpdate = true;
      return tex;
    }

    const meshes: THREE.Mesh[] = [];
    CARDS.forEach((card, i) => {
      const geo = new THREE.PlaneGeometry(W, H, 28, 2);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let v = 0; v < pos.count; v++) {
        const x = pos.getX(v);
        pos.setZ(v, -Math.pow(x / (W / 2), 2) * 0.34);
      }
      pos.needsUpdate = true;
      const mat = new THREE.MeshBasicMaterial({
        map: makeTexture(card),
        transparent: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const h1 = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
      const h2 = Math.abs((Math.sin(i * 78.233) * 12733.41) % 1);
      mesh.userData = {
        angle: (i / CARDS.length) * Math.PI * 2,
        radius: radius + h2 * 2.4 - 1.0,
        yOff: h1 * 3.2 - 1.6,
        phase: i * 1.7,
        speed: reduce ? 0 : 0.45 + (i % 3) * 0.16,
        scale: 1,
        targetScale: 1,
      };
      group.add(mesh);
      meshes.push(mesh);
    });

    // Re-render textures once webfonts are ready (otherwise canvas uses fallback fonts).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (unmounted) return;
        meshes.forEach((m, i) => {
          const mat = m.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.map = makeTexture(CARDS[i]);
          mat.needsUpdate = true;
        });
      });
    }

    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-3, -3);
    let curRot = 0;
    let targetRot = 0;
    let hovered = -1;
    let tCamX = 0;
    let tCamY = 0;
    let dragging = false;
    let lastX = 0;
    const clock = new THREE.Clock();

    const setMouseFromEvent = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      tCamX = mouse.x * 1.5;
      tCamY = mouse.y * 0.9;
    };
    const onPointerMove = (e: PointerEvent) => {
      setMouseFromEvent(e);
      if (dragging) {
        targetRot -= (e.clientX - lastX) * 0.006;
        lastX = e.clientX;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };
    const onLeave = () => {
      mouse.set(-3, -3);
      tCamX = 0;
      tCamY = 0;
    };
    const onWheel = (e: WheelEvent) => {
      targetRot += e.deltaY * 0.0011;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("wheel", onWheel, { passive: true });

    // Pause the render loop when the hero scrolls off-screen to save battery/GPU.
    let visible = true;
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0 },
      );
      observer.observe(canvas);
    }

    let lastW = 0;
    let lastH = 0;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      // While hidden, keep the rAF alive but skip all render/raycast work so it idles cheaply.
      if (!visible) return;
      const t = clock.getElapsedTime();
      const cw = parent.clientWidth || window.innerWidth || 1;
      const ch = parent.clientHeight || window.innerHeight || 1;
      if (cw !== lastW || ch !== lastH) {
        lastW = cw;
        lastH = ch;
        renderer.setSize(cw, ch, false);
        camera.aspect = cw / ch;
        camera.updateProjectionMatrix();
      }
      if (!reduce) targetRot += 0.0017;
      curRot += (targetRot - curRot) * 0.07;
      group.rotation.y = curRot;

      meshes.forEach((m) => {
        const u = m.userData;
        m.position.x = Math.cos(u.angle) * u.radius;
        m.position.z = Math.sin(u.angle) * u.radius;
        m.position.y = u.yOff + (reduce ? 0 : Math.sin(t * u.speed + u.phase) * 0.18);
      });
      group.updateMatrixWorld(true);

      if (mouse.x > -2) {
        ray.setFromCamera(mouse, camera);
        const hits = ray.intersectObjects(meshes, false);
        hovered = hits.length ? meshes.indexOf(hits[0].object as THREE.Mesh) : -1;
      } else {
        hovered = -1;
      }
      canvas.style.cursor = dragging ? "grabbing" : hovered >= 0 ? "pointer" : "grab";

      meshes.forEach((m, i) => {
        m.lookAt(camera.position);
        const u = m.userData;
        u.targetScale = i === hovered ? 1.16 : 1;
        u.scale += (u.targetScale - u.scale) * 0.12;
        m.scale.setScalar(u.scale);
      });

      camera.position.x += (tCamX - camera.position.x) * 0.045;
      camera.position.y += (tCamY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      unmounted = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("wheel", onWheel);
      meshes.forEach((m) => {
        m.geometry.dispose();
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        display: "block",
        cursor: "grab",
      }}
    />
  );
}
