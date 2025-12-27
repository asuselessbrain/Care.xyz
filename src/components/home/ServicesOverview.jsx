import { getServices } from "@/actions/server/service";
import Link from "next/link";

export default async function ServicesOverview() {
  const services = await getServices();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Top Services</h2>
        <Link className="btn btn-outline" href="/services">View More</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {services.slice(0, 3).map((s) => (
          <div key={s.id} className="card bg-base-100 shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.name} className="rounded-t-md h-40 w-full object-cover" />
            <div className="card-body">
              <h3 className="card-title">{s.name}</h3>
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
