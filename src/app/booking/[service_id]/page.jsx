import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import BookingClient from "@/components/booking/BookingClient";

export default async function BookingPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/booking/${params.service_id}`);
  }
  return <BookingClient params={params} />;
}
