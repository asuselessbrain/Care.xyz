import React from "react";
import SuccessMetrics from "./SuccessMetrics";

export default function Testimonials() {
  return (
    <section className="rounded-xl bg-base-200 p-6 md:p-10">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Families</h2>
          <p className="text-base md:text-lg text-base-content/70">Real stories from parents and caregivers in our community.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <div className="card-body space-y-3">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>AK</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Ayesha Khan</h3>
                  <p className="text-sm text-base-content/70">Parent</p>
                </div>
              </div>
              <p>“Our babysitter was punctual, kind and great with our newborn. Booking was so easy.”</p>
              <div className="rating rating-sm">
                <input type="radio" name="ayesha-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="ayesha-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="ayesha-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="ayesha-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="ayesha-rating" className="mask mask-star-2" readOnly defaultChecked />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <div className="card-body space-y-3">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>SR</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Shamim Rahman</h3>
                  <p className="text-sm text-base-content/70">Son</p>
                </div>
              </div>
              <p>“The elderly care assistant was patient and attentive. My father felt very comfortable.”</p>
              <div className="rating rating-sm">
                <input type="radio" name="shamim-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="shamim-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="shamim-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="shamim-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="shamim-rating" className="mask mask-star-2" readOnly defaultChecked />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <div className="card-body space-y-3">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>MM</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Mehedi Mahmood</h3>
                  <p className="text-sm text-base-content/70">Brother</p>
                </div>
              </div>
              <p>“Post-recovery support was excellent. Scheduling and communication were smooth throughout.”</p>
              <div className="rating rating-sm">
                <input type="radio" name="mehedi-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="mehedi-rating" className="mask mask-star-2" readOnly />
                <input type="radio" name="mehedi-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="mehedi-rating" className="mask mask-star-2" readOnly defaultChecked />
                <input type="radio" name="mehedi-rating" className="mask mask-star-2" readOnly defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div>
          <SuccessMetrics />
        </div>
      </div>
    </section>
  );
}
