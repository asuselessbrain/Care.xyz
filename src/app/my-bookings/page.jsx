"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/my-bookings");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/bookings").then(r => r.json()).then((data) => {
        setItems(data);
        setLoading(false);
      });
    }
  }, [status, router]);

  return (
    <div className="md:w-11/12 mx-auto py-6 space-y-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {loading ? (
        <div className="skeleton h-6 w-64"></div>
      ) : items.length === 0 ? (
        <div className="alert">No bookings yet. <Link href="/services" className="link link-primary">Explore services</Link></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.serviceName}</td>
                  <td>{b.durationValue} {b.durationUnit}</td>
                  <td>{[b.location?.division, b.location?.district, b.location?.city, b.location?.area].filter(Boolean).join(", ")}</td>
                  <td>৳{b.totalCost}</td>
                  <td>
                    <span className={`badge ${b.status === "Pending" ? "badge-warning" : b.status === "Confirmed" ? "badge-info" : b.status === "Completed" ? "badge-success" : "badge-error"}`}>{b.status}</span>
                  </td>
                  <td className="space-x-2">
                    <Link href={`/service/${b.serviceId}`} className="btn btn-sm btn-outline">View Details</Link>
                    {b.status === "Pending" ? (
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={async () => {
                          const res = await fetch(`/api/bookings/cancel`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bookingId: b.bookingId }),
                          });
                          const ok = (await res.json())?.ok;
                          if (ok) {
                            setItems((prev) => prev.map((x) => x.bookingId === b.bookingId ? { ...x, status: "Cancelled" } : x));
                          }
                        }}
                      >
                        Cancel Booking
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
