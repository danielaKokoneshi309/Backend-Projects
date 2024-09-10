const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { required } = require("joi");

const userSchema = new mongoose.Schema({
  firstName: { type: String, minLength: 3, maxLength: 55, required: true },
  lastName: { type: String, minLength: 3, maxLength: 55, required: true },
  email: { type: String, minLength: 5, maxLength: 55, required: true },
  password: { type: String, minLength: 8, maxLength: 255, required: true },
  isManager: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isManager: this.isManager,
    },

    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "10h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
