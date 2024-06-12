const { Schema, model } = require("mongoose");

const instructionsSchema = new Schema({
    Instructions: String
})

const Instructions = model("Instructions", instructionsSchema)

module.exports = Instructions;