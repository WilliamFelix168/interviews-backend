const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
