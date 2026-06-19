"use client";

import { CSSProperties, useState } from "react";

type ImageSlotProps = {
  /** When provided, the image is shown. Otherwise a styled placeholder renders. */
  src?: string;
  alt?: string;
  /** Placeholder caption shown until an image is supplied. */
  placeholder?: string;
  /** Background colour of the empty slot. */
  bg?: string;
  radius?: number;
  style?: CSSProperties;
  className?: string;
};

/**
 * Stand-in for the original design's <image-slot> custom element.
 * Renders a uploaded image if `src` is set, otherwise a branded placeholder
 * so the layout is complete before real assets are dropped in.
 */
export default function ImageSlot({
  src,
  alt = "",
  placeholder = "Drop an image",
  bg = "rgba(10,49,101,0.06)",
  radius = 0,
  style,
  className,
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImg = !!src && !failed;
  const showSkeleton = showImg && !loaded;
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: radius,
        background: showImg ? "transparent" : bg,
        ...style,
      }}
    >
      {showSkeleton && <div className="vk-skel" />}
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity .6s ease",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(120,130,150,0.65)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
