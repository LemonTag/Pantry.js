const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ingredientSchema = new Schema({
    text: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      measure: {
        type: String,
        required: true
      },
      food: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      foodId: {
        type: String,
        required: true,
        unique: true
      }
    });

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;