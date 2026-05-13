import { useState, useEffect, useRef } from "react";

/**
 * Custom hook: animates a number from 0 to target when element enters viewport.
 * Returns [ref, displayValue]
 */
export default function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isDecimal = String(target).includes(".");
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(
              isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current),
            );
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, count];
}
