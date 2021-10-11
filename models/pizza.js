const { Schema, model } = require("mongoose");



const pizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: "large"
    },
    toppings: []
})


// create the Pizza model using the PizzaSchema
const Pizza = model("pizza", pizzaSchema)

// export the Pizza model
module.exports = Pizza;