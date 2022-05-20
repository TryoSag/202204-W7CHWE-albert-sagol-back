const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, require: true },
  usename: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  image: { type: String },
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    default: [],
  },
  enemies: {
    type: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    default: [],
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
