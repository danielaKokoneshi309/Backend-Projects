/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - type
 *         - number
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room
 *         type:
 *           type: string
 *           description: The type of room (e.g., Single, Double)
 *         number:
 *           type: integer
 *           description: The room number
 *         description:
 *           type: string
 *           description: A brief description of the room
 *         numberOfBeds:
 *           type: integer
 *           description: The number of beds in the room
 *       example:
 *         id: d5fE_asz
 *         type: Single
 *         number: 101
 *         description: A cozy single room with a sea view.
 *         numberOfBeds: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *         isManager:
 *           type: boolean
 *           description: Whether the user is a manager
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: securePassword123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - userId
 *         - roomId
 *         - arrivalDate
 *         - departureDate
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who made the booking.
 *           example: 66bc7025f6897b0c3206fe3f
 *         roomId:
 *           type: string
 *           description: The ID of the booked room.
 *           example: 66bb7a3a3af4bc9b772d218d
 *         arrivalDate:
 *           type: string
 *           format: date-time
 *           description: The date and time the user is expected to arrive.
 *           example: 2024-08-15T12:00:00Z
 *         departureDate:
 *           type: string
 *           format: date-time
 *           description: The date and time the user is expected to leave.
 *           example: 2024-08-20T12:00:00Z
 *         isApproved:
 *           type: boolean
 *           description: Indicates whether the booking is approved.
 *           example: true
 */
