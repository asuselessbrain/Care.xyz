import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { cancelBooking } from "@/actions/server/booking";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.email) return Response.json({ ok: false }, { status: 401 });
  const { bookingId } = await req.json();
  const ok = await cancelBooking(bookingId, session.email);
  return Response.json({ ok });
}
