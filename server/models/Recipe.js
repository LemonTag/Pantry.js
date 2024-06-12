const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const recipeSchema = new Schema({
    label:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    instructions:[{
        type:String,   
        ref: Instructions     
    }],
    url:{
        type:String
    },
    ingredients:[{
        type:Schema.Types.ObjectId,
        ref:'Ingredient'
    }],
    createdAt:{
        type:Date,
        default:Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
});

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;