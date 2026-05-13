import { useEffect, useRef } from "react";

/**
 * Custom hook: adds a CSS class when the element enters the viewport.
 * Usage:
 *   const ref = useScrollAnimation("my-visible-class");
 *   <div ref={ref}>...</div>
 */
export default function useScrollAnimation(
  visibleClass = "visible",
  options = {},
) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(visibleClass);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleClass]);

  return ref;
}
