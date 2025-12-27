import { getServiceById } from "@/actions/server/service";
import Link from "next/link";
import { fontBangla } from "@/lib/fonts";
import { FiCheck, FiClock, FiShield } from "react-icons/fi";

export async function generateMetadata({ params }) {
  const p = await params;
  const service = await getServiceById(p.id);
  return {
    title: `${service?.name || "Service"} | Care.xyz`,
    description: service?.short || "Service details",
  };
}

export default async function ServiceDetailPage({ params }) {
  const p = await params;
  const service = await getServiceById(p.id);
  if (!service) {
    return (
      <div className="md:w-11/12 mx-auto py-6">
        <h2 className="text-xl font-semibold">Service not found</h2>
        <Link href="/services" className="btn btn-primary mt-4">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="md:w-11/12 mx-auto py-6 space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <figure className="relative">
              <img src={service.image} alt={service.name} className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-base-100/70 to-transparent" />
              <div className="absolute bottom-3 left-3 badge badge-primary">Service</div>
            </figure>
            <div className="card-body space-y-3">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {service.name}
                <span className="badge badge-outline">{service.chargeType.toUpperCase()}</span>
              </h1>
              {service.name_bn && (
                <h2 className={`${fontBangla.className} text-2xl md:text-3xl font-semibold text-base-content/80`}>{service.name_bn}</h2>
              )}
              <p>{service.description}</p>
              {service.description_bn && (
                <p className={`${fontBangla.className} text-base md:text-lg`}>{service.description_bn}</p>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline"><FiClock /> ৳{service.charge} / {service.chargeType}</span>
                <span className="badge badge-outline"><FiShield /> Verified Care</span>
              </div>
            </div>
          </div>

          {Array.isArray(service.features) && service.features.length > 0 && (
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="text-xl font-semibold">What&apos;s included</h3>
                <ul className="grid sm:grid-cols-2 gap-2 mt-2">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2"><FiCheck className="text-primary mt-1" /> <span>{f}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {Array.isArray(service.features_bn) && service.features_bn.length > 0 && (
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className={`${fontBangla.className} text-xl font-semibold`}>যা অন্তর্ভুক্ত</h3>
                <ul className={`${fontBangla.className} grid sm:grid-cols-2 gap-2 mt-2`}>
                  {service.features_bn.map((f, i) => (
                    <li key={i} className="flex items-start gap-2"><FiCheck className="text-primary mt-1" /> <span>{f}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="text-xl font-semibold">Pricing</h3>
              <p className="text-2xl font-bold">৳{service.charge} <span className="text-base font-normal">/ {service.chargeType}</span></p>
              <p className="text-sm text-base-content/70">Transparent rate. Final total depends on selected duration.</p>
              <div className="card-actions pt-2">
                <Link className="btn btn-primary w-full" href={`/booking/${service.id}`}>Book Service</Link>
                <Link className="btn btn-outline w-full" href="/services">Back to Services</Link>
              </div>
            </div>
          </div>
          <div className="alert alert-info">
            <span><FiShield /> Your safety matters — verified profiles and reviews.</span>
          </div>
          {(Array.isArray(service.faqs) && service.faqs.length > 0) && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">FAQs</h3>
              {service.faqs.map((faq, i) => (
                <div key={i} className="collapse collapse-arrow bg-base-100 shadow">
                  <input type="checkbox" />
                  <div className="collapse-title font-medium">{faq.q}</div>
                  <div className="collapse-content">
                    <p className="text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(Array.isArray(service.faqs_bn) && service.faqs_bn.length > 0) && (
            <div className="space-y-2">
              <h3 className={`${fontBangla.className} text-xl font-semibold`}>প্রশ্নোত্তর</h3>
              {service.faqs_bn.map((faq, i) => (
                <div key={i} className={`collapse collapse-arrow bg-base-100 shadow ${fontBangla.className}`}>
                  <input type="checkbox" />
                  <div className="collapse-title font-medium">{faq.q}</div>
                  <div className="collapse-content">
                    <p className="text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
