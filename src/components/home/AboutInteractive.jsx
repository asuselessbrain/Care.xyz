"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiShield, FiUsers, FiClock } from "react-icons/fi";

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
      const k = Math.round(val / 100) / 10; // one decimal
      return `${k.toFixed(1)}k+`;
    }
    return `${Math.round(val)}${suffix}`;
  }, [val, decimals, suffix, target]);

  return (
    <div ref={ref} className="stat">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${colorClass}`}>{display}</div>
      <div className="stat-desc">Growing with community</div>
    </div>
  );
}

export default function AboutInteractive() {
  const [tab, setTab] = useState("mission");
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-5">
        <div className="tabs tabs-boxed w-fit">
          <button className={`tab ${tab === "mission" ? "tab-active" : ""}`} onClick={() => setTab("mission")}>Mission</button>
          <button className={`tab ${tab === "how" ? "tab-active" : ""}`} onClick={() => setTab("how")}>How it works</button>
          <button className={`tab ${tab === "safety" ? "tab-active" : ""}`} onClick={() => setTab("safety")}>Safety</button>
        </div>

        {tab === "mission" && (
          <p className="text-base md:text-lg transition-opacity duration-300">
            We believe care should be safe, trusted and accessible for every family. Care.xyz connects you with verified caregivers for babysitting, elderly and special care — right at home, on your schedule.
          </p>
        )}
        {tab === "how" && (
          <p className="text-base md:text-lg transition-opacity duration-300">
            Browse services, compare profiles, pick a time and book securely. Get confirmations, chat with caregivers and manage sessions in one place.
          </p>
        )}
        {tab === "safety" && (
          <p className="text-base md:text-lg transition-opacity duration-300">
            Safety first: ID verification, background checks, reviews and clear communication before every session.
          </p>
        )}

        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          <li className="p-4 rounded-lg bg-base-100 shadow hover:shadow-lg transition hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
              <FiUsers className="text-primary mt-1" size={22} />
              <div>
                <h3 className="font-semibold">Trusted Professionals</h3>
                <p className="text-sm">Background-checked caregivers with child, elderly and special care experience.</p>
              </div>
            </div>
          </li>
          <li className="p-4 rounded-lg bg-base-100 shadow hover:shadow-lg transition hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
              <FiClock className="text-secondary mt-1" size={22} />
              <div>
                <h3 className="font-semibold">Simple, Secure Booking</h3>
                <p className="text-sm">Transparent pricing, instant scheduling and safe payments in one place.</p>
              </div>
            </div>
          </li>
          <li className="p-4 rounded-lg bg-base-100 shadow hover:shadow-lg transition hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
              <FiShield className="text-info mt-1" size={22} />
              <div>
                <h3 className="font-semibold">Care Tailored to You</h3>
                <p className="text-sm">Flexible hours and personalized support fitting your routine.</p>
              </div>
            </div>
          </li>
          <li className="p-4 rounded-lg bg-base-100 shadow hover:shadow-lg transition hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
              <FiShield className="text-success mt-1" size={22} />
              <div>
                <h3 className="font-semibold">Community & Compassion</h3>
                <p className="text-sm">We prioritize dignity, inclusion and respectful caregiving for every need.</p>
              </div>
            </div>
          </li>
        </ul>

        <div className="pt-2 flex gap-3">
          <Link href="/services" className="btn btn-primary">Explore Services</Link>
          <Link href="/my-bookings" className="btn btn-outline">View My Bookings</Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <AnimatedStat title="Care Sessions" target={10000} colorClass="text-primary" />
          <AnimatedStat title="Verified Caregivers" target={500} colorClass="text-secondary" />
          <AnimatedStat title="Customer Rating" target={4.8} decimals={1} suffix="★" />
        </div>
        <div className="alert alert-info">
          <span>
            Your safety matters — we verify profiles, collect reviews and provide clear communication before every session.
          </span>
        </div>
      </div>
    </div>
  );
}
