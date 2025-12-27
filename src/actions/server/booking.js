import { collections, dbConnect } from "@/lib/dbConnect";
import { sendEmail } from "@/lib/sendEmail";
import { bookingInvoiceTemplate } from "@/lib/bookingInvoice";

export const createBooking = async ({
  userEmail,
  service,
  durationValue,
  durationUnit, // 'hours' | 'days'
  location,
  address,
}) => {
  const unitRate = service.charge;
  let totalCost = 0;
  if (service.chargeType === "hour") {
    const hours = durationUnit === "days" ? durationValue * 24 : durationValue;
    totalCost = hours * unitRate;
  } else {
    const days = durationUnit === "days" ? durationValue : Math.ceil(durationValue / 24);
    totalCost = days * unitRate;
  }

  const booking = {
    bookingId: `BK-${Date.now()}`,
    serviceId: service.id,
    serviceName: service.name,
    userEmail,
    durationValue,
    durationUnit,
    unitRate,
    totalCost,
    location,
    address,
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await dbConnect(collections.BOOKINGS).insertOne(booking);

  // Send invoice email
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const html = bookingInvoiceTemplate({ booking });
    await sendEmail({
      to: userEmail,
      subject: `Booking Invoice - ${booking.bookingId}`,
      html,
    });
  }

  return { acknowledged: true, booking };
};

export const getUserBookings = async (userEmail) => {
  return await dbConnect(collections.BOOKINGS)
    .find({ userEmail }, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
};

export const cancelBooking = async (bookingId, userEmail) => {
  const res = await dbConnect(collections.BOOKINGS).updateOne(
    { bookingId, userEmail },
    { $set: { status: "Cancelled", updatedAt: new Date() } }
  );
  return res.modifiedCount > 0;
};
