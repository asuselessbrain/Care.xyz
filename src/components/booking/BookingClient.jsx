"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { BD_LOCATIONS } from "@/data/bdLocations";
import { FiClock, FiMapPin, FiShield, FiCheck } from "react-icons/fi";

export default function BookingClient({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const routeParams = useParams();
  const serviceId = params?.service_id ?? routeParams?.service_id;

  const [service, setService] = useState(null);
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState("hours");
  const [location, setLocation] = useState({ division: "", district: "", city: "", area: "" });
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const divisions = useMemo(() => BD_LOCATIONS.divisions.map((d) => d.name), []);
  const districts = useMemo(() => {
    const div = BD_LOCATIONS.divisions.find((d) => d.name === location.division);
    return div ? div.districts.map((x) => x.name) : [];
  }, [location.division]);
  const cities = useMemo(() => {
    const div = BD_LOCATIONS.divisions.find((d) => d.name === location.division);
    const dist = div?.districts.find((x) => x.name === location.district);
    return dist ? dist.cities : [];
  }, [location.division, location.district]);

  useEffect(() => {
    if (!serviceId) return;
    const fetchService = async () => {
      const res = await fetch(`/api/services?id=${serviceId}`);
      const data = await res.json();
      setService(data);
    };
    fetchService();
  }, [serviceId]);

  const totalCost = useMemo(() => {
    if (!service) return 0;
    const rate = service.charge;
    if (service.chargeType === "hour") {
      const hours = durationUnit === "days" ? durationValue * 24 : durationValue;
      return hours * rate;
    }
    // chargeType === 'day'
    const days = durationUnit === "days" ? durationValue : Math.ceil(durationValue / 24);
    return days * rate;
  }, [service, durationValue, durationUnit]);

  const canSubmit = useMemo(() => {
    const hasService = Boolean(service);
    const hasDuration = Number(durationValue) >= 1 && (durationUnit === "hours" || durationUnit === "days");
    const hasLocation = Boolean(location.division && location.district && location.city && location.area);
    const hasAddress = address.trim().length >= 10;
    return hasService && hasDuration && hasLocation && hasAddress;
  }, [service, durationValue, durationUnit, location, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      Swal.fire("Incomplete", "Please fill all required fields.", "warning");
      return;
    }
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=/booking/${serviceId}`);
      return;
    }

    setIsSubmitting(true);
    const payload = {
      serviceId,
      durationValue,
      durationUnit,
      location,
      address,
    };

    const res = await fetch(`/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (json?.acknowledged) {
      Swal.fire("Success", "Booking created. Check email for invoice.", "success");
      router.push("/my-bookings");
    } else {
      Swal.fire("Error", json?.message || "Failed to create booking", "error");
    }
    setIsSubmitting(false);
  };

  if (!serviceId) {
    return <div className="md:w-11/12 mx-auto py-6">Missing service identifier in URL.</div>;
  }
  if (!service) {
    return <div className="md:w-11/12 mx-auto py-6">Loading service...</div>;
  }

  return (
    <div className="md:w-11/12 mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Book: {service.name}</h1>
        <div className="badge badge-outline">Secure <FiShield className="ml-1" /></div>
      </div>

      <ul className="steps w-full">
        <li className="step step-primary">Select Duration</li>
        <li className="step step-primary">Location</li>
        <li className="step">Confirm</li>
      </ul>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Service</div>
                <div className="badge badge-outline"><FiClock className="mr-1" /> ৳{service.charge} / {service.chargeType}</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="form-control">
                  <span className="label-text">Duration Value</span>
                  <input type="number" min={1} className="input input-bordered" value={durationValue} onChange={(e) => setDurationValue(parseInt(e.target.value || "1"))} />
                </label>
                <label className="form-control">
                  <span className="label-text">Duration Unit</span>
                  <select className="select select-bordered" value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)}>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </label>
              </div>

              <div className="stats stats-vertical sm:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Rate</div>
                  <div className="stat-value">৳{service.charge}</div>
                  <div className="stat-desc">per {service.chargeType}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Estimated Total</div>
                  <div className="stat-value">৳{totalCost}</div>
                  <div className="stat-desc">updates as you change inputs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <div className="font-semibold">Location</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <span className="label-text">Division</span>
                  <select
                    className="select select-bordered w-full"
                    value={location.division}
                    onChange={(e) => setLocation({ division: e.target.value, district: "", city: "", area: location.area })}
                  >
                    <option value="">Select division</option>
                    {divisions.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {!location.division && <span className="text-xs text-error mt-1">Required</span>}
                </label>
                <label className="form-control w-full">
                  <span className="label-text">District</span>
                  <select
                    className="select select-bordered w-full"
                    value={location.district}
                    onChange={(e) => setLocation({ ...location, district: e.target.value, city: "" })}
                    disabled={!location.division}
                  >
                    <option value="">Select district</option>
                    {districts.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {!location.district && <span className="text-xs text-error mt-1">Required</span>}
                </label>
                <label className="form-control w-full">
                  <span className="label-text">City</span>
                  <select
                    className="select select-bordered w-full"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    disabled={!location.district}
                  >
                    <option value="">Select city</option>
                    {cities.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {!location.city && <span className="text-xs text-error mt-1">Required</span>}
                </label>
                <label className="form-control w-full">
                  <span className="label-text">Area</span>
                  <input className="input input-bordered w-full" placeholder="e.g., Bashundhara R/A, Block C" value={location.area} onChange={(e) => setLocation({ ...location, area: e.target.value })} />
                  {!location.area && <span className="text-xs text-error mt-1">Required</span>}
                </label>
              </div>
              <label className="form-control w-full">
                <span className="label-text">Full Address</span>
                <textarea className="textarea textarea-bordered w-full" rows={3} placeholder="House, Road, Landmark" value={address} onChange={(e) => setAddress(e.target.value)} />
                {address.trim().length < 10 && <span className="text-xs text-error mt-1">Please enter at least 10 characters</span>}
              </label>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-2">
              <div className="font-semibold">Summary</div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span className="text-2xl font-bold">৳{totalCost}</span>
              </div>
              <div className="text-sm text-base-content/70">
                <FiMapPin className="inline mr-1" /> {location.city || "City"}, {location.area || "Area"}
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
              <button type="button" className="btn btn-outline w-full" onClick={() => router.push(`/service/${serviceId}`)}>
                Back to Service
              </button>
              <div className="alert alert-info">
                <span><FiShield className="mr-1" /> Safe and verified caregivers</span>
              </div>
              <div className="text-xs text-base-content/60 flex items-center gap-2">
                <FiCheck /> By confirming, you agree to our terms.
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
