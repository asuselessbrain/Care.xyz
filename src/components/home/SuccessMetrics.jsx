"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

function useInView(options = { threshold: 0.4 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setInView(true);
      });
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView };
}

function AnimatedStat({ title, target = 0, suffix = "", decimals = 0, colorClass = "" }) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = start + (target - start) * eased;
      setVal(next);
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = useMemo(() => {
    if (decimals > 0) return `${val.toFixed(decimals)}${suffix}`;
    if (target >= 1000) {
      const k = Math.round(val / 100) / 10; // 1 decimal
      return `${k.toFixed(1)}k+`;
    }
    return `${Math.round(val)}${suffix}`;
  }, [val, decimals, suffix, target]);

  return (
    <div ref={ref} className="stat">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${colorClass}`}>{display}</div>
      <div className="stat-desc">Updated regularly</div>
    </div>
  );
}

export default function SuccessMetrics() {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      <AnimatedStat title="Families Served" target={8000} colorClass="text-primary" />
      <AnimatedStat title="Care Sessions" target={10000} colorClass="text-secondary" />
      <AnimatedStat title="Verified Caregivers" target={500} />
      <AnimatedStat title="Avg Rating" target={4.8} decimals={1} suffix="★" />
    </div>
  );
}
