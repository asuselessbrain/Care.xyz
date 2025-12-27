import { getServices } from "@/actions/server/service";
import Link from "next/link";

export const metadata = {
  title: "Care.xyz | Services",
  description: "Explore Baby Care, Elderly Care and Sick People Service.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="md:w-11/12 mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="card bg-base-100 shadow">
            <figure className="px-4 pt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} className="rounded-md h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{s.name}</h2>
              <p>{s.short}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={`/service/${s.id}`}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
