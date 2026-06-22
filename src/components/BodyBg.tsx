"use client";

import { useEffect } from "react";

/** Sets the document background for a template and restores it on unmount, so
 *  light templates do not show the dark default behind overscroll. */
export default function BodyBg({ color }: { color: string }) {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = color;
    return () => {
      document.body.style.background = prev;
    };
  }, [color]);
  return null;
}
