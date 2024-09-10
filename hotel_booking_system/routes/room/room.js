const express = require("express");
const { Room } = require("../../models/room");
const validateRoom = require("./roomValidation");
const mongoose = require("mongoose");
const { Booking } = require("../../models/booking");
const isClient = require("../../middleware/isClient");
const isManager = require("../../middleware/isManager");

const router = express.Router();

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Retrieve a list of all the rooms or available rooms by date
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *       - in: query
 *         name: arrivalDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Arrival date (optional)
 *       - in: query
 *         name: departureDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Departure date (optional)
 *     responses:
 *       200:
 *         description: A list of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       404:
 *         description: No available rooms found.
 *       500:
 *         description: An error occurred.
 */

router.get("/", isClient, async (req, res) => {
  try {
    const { arrivalDate, departureDate } = req.query;

    if (!arrivalDate && !departureDate) {
      const room = await Room.find({});
      return res.send(room);
    }
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);

    const bookedRooms = await Booking.find({
      $or: [
        {
          arrivalDate: { $lte: departure },
          departureDate: { $gte: arrival },
        },
      ],
      $and: [{ isApproved: { $ne: null } }, { isApproved: { $ne: false } }],
    }).select("roomId");

    const bookedRoomIds = bookedRooms.map((booking) => booking.roomId);

    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds },
    });
    if (availableRooms.length === 0)
      return res
        .status(404)
        .send("There are no available rooms in the provided dates");
    res.send(availableRooms);
  } catch (err) {
    res.status(500).send("An error occurred while getting the room.");
  }
});
/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Retrieve a room by ID
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     responses:
 *       200:
 *         description: A single room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found.
 *       400:
 *         description: Invalid ID format.
 *       500:
 *         description: An error occurred.
 */

router.get("/:id", isManager, async (req, res) => {
  const roomId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).send("The room was not found");
    res.send(room);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving the room");
  }
});
/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create a new room
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post("/", isManager, async (req, res) => {
  try {
    const { error } = validateRoom(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const room = new Room({
      type: req.body.type,
      number: req.body.number,
      description: req.body.description,
      numberOfBeds: req.body.numberOfBeds,
    });

    const savedRooms = await room.save();

    res.send(savedRooms);
  } catch (err) {
    res.status(500).send("An error occurred while saving the rooms.");
  }
});
/**
 * @swagger
 * /room/{id}:
 *   put:
 *     summary: Update an existing room
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated successfully.
 *       404:
 *         description: The room was not found.
 *       400:
 *         description: Invalid ID format or bad request.
 *       500:
 *         description: An error occurred.
 */

router.put("/:id", isManager, async (req, res) => {
  const roomId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).send("Invalid ID format");
  }
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("The room was not found");

    const { error } = validateRoom(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    (room.type = req.body.type),
      (room.number = req.body.number),
      (room.description = req.body.description),
      (room.numberOfBeds = req.body.numberOfBeds);
    const updatedRoom = await room.save();

    res.send(updatedRoom);
  } catch (err) {
    res.status(500).send("An error occurred while updating the room.");
  }
});
/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token provided to the client for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully.
 *       404:
 *         description: The room with this ID was not found.
 *       500:
 *         description: An error occurred.
 */
router.delete("/:id", isManager, async (req, res) => {
  try {
    const roomReferenceInBooking = await Booking.findOne({
      roomId: req.params.id,
    });

    if (roomReferenceInBooking) {
      return res
        .status(409)
        .send("Cannot delete room, because it is currently booked!");
    }

    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).send("The room with this ID was not found");
    }

    res.send(room);
  } catch (err) {
    res.status(500).send("An error occurred while deleting the room.");
  }
});

module.exports = router;
