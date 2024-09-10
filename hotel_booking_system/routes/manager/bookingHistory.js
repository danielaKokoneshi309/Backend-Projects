require("express-async-errors");
const express = require("express");
const isManager = require("../../middleware/isManager");
const { Booking } = require("../../models/booking");
const router = express.Router();

/**
 * @swagger
 * /bookingHistory:
 *   get:
 *     summary: Get all bookings
 *     tags:
 *       - Manager Bookings
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *     responses:
 *       200:
 *         description: A list of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The booking ID.
 *                   userId:
 *                     type: string
 *                     description: The ID of the user who made the booking.
 *                   roomId:
 *                     type: string
 *                     description: The ID of the booked room.
 *                   arrivalDate:
 *                     type: string
 *                     format: date-time
 *                     description: The arrival date for the booking.
 *                   departureDate:
 *                     type: string
 *                     format: date-time
 *                     description: The departure date for the booking.
 *                   isApproved:
 *                     type: boolean
 *                     description: Indicates whether the booking is approved.
 *       404:
 *         description: No bookings found in the history.
 *       500:
 *         description: An error occurred while retrieving the bookings.
 */


router.get("/", isManager, async (req, res) => {
  const bookings = await Booking.find({});

  if (bookings.length === 0) {
    return res.send("There are no bookings in the history");
  }

  res.send(bookings);
});

module.exports = router;
