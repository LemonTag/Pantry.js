const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    text: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    measure: {
      type: String,
    },
    food: {
      type: String,
      
    },
    weight: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
     },
  { toJSON: { virtuals: true } }
);

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
