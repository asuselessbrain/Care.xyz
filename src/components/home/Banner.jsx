import { fontBangla } from "@/lib/fonts";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="rounded-xl bg-linear-to-r from-primary/10 to-base-200 p-6 md:p-10">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">

        <div className="flex-1 space-y-5 text-center md:text-left">
          <h1 className={`${fontBangla.className} text-5xl md:text-6xl font-bold leading-tight`}>
            আপনার শিশু, বৃদ্ধ ও অসুস্থের জন্য
            <span className="text-primary"> নির্ভরযোগ্য কেয়ার সার্ভিস</span>
          </h1>
          <p className="text-base md:text-lg">
            Care.xyz makes caregiving easy, secure and accessible — book trusted babysitting,
            elderly and special care at home.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="badge badge-outline">Baby Sitting</span>
            <span className="badge badge-outline">Elderly Care</span>
            <span className="badge badge-outline">Special Care</span>
            <span className="badge badge-outline">Verified Caregivers</span>
            <span className="badge badge-outline">Secure Booking</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
            <a href="/services" className="btn btn-primary">Book Care Service</a>
            <a href="/services" className="btn btn-outline">Explore Services</a>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            alt="Reliable care services banner"
            src={"/assets/hero.png"}
            width={560}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </section>

  );
};

export default Banner;
