import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createBooking, getUserBookings } from "@/actions/server/booking";
import { getServiceById } from "@/actions/server/service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.email) return Response.json([], { status: 200 });
  const bookings = await getUserBookings(session.email);
  return Response.json(bookings);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const service = await getServiceById(body.serviceId);
  if (!service) return Response.json({ message: "Invalid service" }, { status: 400 });

  const result = await createBooking({
    userEmail: session.email,
    service,
    durationValue: body.durationValue,
    durationUnit: body.durationUnit,
    location: body.location,
    address: body.address,
  });
  return Response.json(result);
}
