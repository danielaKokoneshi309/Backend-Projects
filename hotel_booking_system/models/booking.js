const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  isApproved: { type: Boolean, default: null },
});
const Booking = mongoose.model("Booking", bookingSchema);
exports.Booking = Booking;
