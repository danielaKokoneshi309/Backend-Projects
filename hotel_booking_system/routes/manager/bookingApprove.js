require("express-async-errors");
const express = require("express");
const isManager = require("../../middleware/isManager");
const { Booking } = require("../../models/booking");
const router = express.Router();

/**
 * @swagger
 * /bookingApprove/{id}:
 *   post:
 *     summary: Approve a booking and update other conflicting bookings.
 *     tags: 
 *       - Manager Bookings
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID to approve.
 *     responses:
 *       200:
 *         description: Successfully approved the booking and updated conflicting bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The booking ID.
 *                 userId:
 *                   type: string
 *                   description: The ID of the user who made the booking.
 *                 roomId:
 *                   type: string
 *                   description: The ID of the booked room.
 *                 arrivalDate:
 *                   type: string
 *                   format: date-time
 *                   description: The arrival date for the booking.
 *                 departureDate:
 *                   type: string
 *                   format: date-time
 *                   description: The departure date for the booking.
 *                 isApproved:
 *                   type: boolean
 *                   description: Indicates whether the booking is approved.
 *       400:
 *         description: Bad request. The booking ID is invalid.
 *       404:
 *         description: The booking with the specified ID was not found.
 *       500:
 *         description: An error occurred while processing the request.
 */


router.post("/:id", isManager, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        isApproved: true,
      },
    },
    { new: true }
  );

  await booking.save();

  const filter = {
    roomId: booking.roomId,
    arrivalDate: { $lt: booking.departureDate },
    departureDate: { $gt: booking.arrivalDate },
    isApproved: null,
  };

  const updateBooking = {
    $set: {
      isApproved: false,
    },
  };

  await Booking.updateMany(filter, updateBooking);
  res.send(booking);
});

module.exports = router;
