import React from "react";
import { fontBangla } from "@/lib/fonts";
import AboutInteractive from "./AboutInteractive";

const About = () => {
  return (
    <section className="rounded-xl bg-base-200 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="bg-linear-to-br from-primary/10 via-secondary/10 to-transparent w-full h-full" />
      </div>
      <div className="space-y-5">
        <h2 className={`${fontBangla.className} text-4xl md:text-5xl font-bold`}>আমাদের মিশন</h2>
      </div>
      <AboutInteractive />
    </section>
  );
};

export default About;
