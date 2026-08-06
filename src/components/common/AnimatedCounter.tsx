"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  value: number;
  className?: string;
  duration?: number;
  formatter?: Intl.NumberFormatOptions;
  suffix?: string;
};

export function AnimatedCounter({ value, className = "", duration = 1.2, formatter, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [duration, isInView, shouldReduceMotion, value]);

  const countValue = shouldReduceMotion ? value : displayValue;
  const formattedValue = new Intl.NumberFormat("en", formatter).format(Math.round(countValue));

  return (
    <span ref={ref} className={className}>
      {formattedValue}
      {suffix}
    </span>
  );
}
