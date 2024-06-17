const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const recipeSchema = new Schema({
    label:{
        type: String,
        required:true
    },
    image:{
        type:String,
        
    },
    
    url:{
        type:String
    },
    ingredientLines: {
        type:[String]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
});

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;