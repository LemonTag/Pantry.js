const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ingredientSchema = new Schema({
    ingredientName:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;