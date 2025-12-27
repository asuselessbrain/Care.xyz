export const bookingInvoiceTemplate = ({ booking }) => {
  const {
    bookingId,
    serviceName,
    durationValue,
    durationUnit,
    unitRate,
    totalCost,
    location,
    address,
  } = booking;

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px; font-family:Arial;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; border-radius:8px;">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:10px 0;">🧾 Booking Invoice</h2>
              <p style="color:#555;">Booking ID: <strong>${bookingId}</strong></p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="6" cellspacing="0" style="border:1px solid #ddd; border-collapse:collapse;">
                <tr>
                  <td width="35%" style="font-weight:bold;">Service</td>
                  <td>${serviceName}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Duration</td>
                  <td>${durationValue} ${durationUnit}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Rate</td>
                  <td>৳${unitRate} / hour</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Location</td>
                  <td>${location?.division || ""} ${location?.district || ""} ${location?.city || ""} ${location?.area || ""}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Address</td>
                  <td>${address}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="right" style="padding-top:15px;">
              <h3>Total: ৳${totalCost}</h3>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:20px; color:#777;">
              <p>Thank you for booking with <strong>Care.xyz</strong> ❤️</p>
              <p style="font-size:12px;">This is an automated email. Please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};
