"use client";

import { useEffect } from "react";

export default function NavScroll() {
  useEffect(() => {
    const nav = document.querySelector("nav.site-nav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("site-nav--scrolled", window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
