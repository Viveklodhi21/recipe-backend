const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      recipeId: { type: String, required: true },
      recipeDetails: { type: Object, required: true },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
