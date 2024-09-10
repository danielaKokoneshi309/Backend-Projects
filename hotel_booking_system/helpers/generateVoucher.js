const PdfPrinter = require("pdfmake");

module.exports = (booking) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const docDefinition = {
    content: [
      { text: "Voucher Document", style: "header" },
      { text: "Client Information", style: "subheader" },
      {
        table: {
          widths: ["30%", "70%"],
          body: [
            [
              { text: "Name:", style: "label" },
              {
                text: `${booking.userId.firstName} ${booking.userId.lastName}`,
                style: "value",
              },
            ],
            [
              { text: "Email:", style: "label" },
              { text: booking.userId.email, style: "value" },
            ],
          ],
        },
        layout: "noBorders",
      },
      { text: "Booking Details", style: "subheader" },

      [
        {
          table: {
            widths: ["30%", "70%"],
            body: [
              [
                { text: "Room Type:", style: "label" },
                { text: booking.roomId.type, style: "value" },
              ],
              [
                { text: "Room Number:", style: "label" },
                { text: booking.roomId.number, style: "value" },
              ],
              [
                { text: "Description:", style: "label" },
                { text: booking.roomId.description, style: "value" },
              ],
              [
                { text: "Number of Beds:", style: "label" },
                { text: booking.roomId.numberOfBeds, style: "value" },
              ],
              [
                { text: "Check-in Date:", style: "label" },
                {
                  text: new Date(booking.arrivalDate).toLocaleDateString(),
                  style: "value",
                },
              ],
              [
                { text: "Check-out Date:", style: "label" },
                {
                  text: new Date(booking.departureDate).toLocaleDateString(),
                  style: "value",
                },
              ],
              [
                { text: "Booking Status:", style: "label" },
                {
                  text:
                    booking.isApproved === null
                      ? "Pending"
                      : booking.isApproved
                      ? "Approved"
                      : "Declined",
                  style: "value",
                },
              ],
            ],
          },
          layout: {
            hLineColor: "#aaa",
            vLineColor: "#aaa",
          },
          margin: [0, 10, 0, 10],
        },
      ],

      { text: "Thank you for choosing our service!", style: "thankyou" },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 20],
        color: "#2E86C1",
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 10],
        color: "#2874A6",
      },
      label: { fontSize: 12, bold: true, color: "#34495E" },
      value: { fontSize: 12, color: "#2C3E50" },
      thankyou: {
        fontSize: 14,
        italics: true,
        margin: [0, 30, 0, 0],
        color: "#2ECC71",
        alignment: "center",
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  const printer = new PdfPrinter(fonts);

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return pdfDoc;
};
