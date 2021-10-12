const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // With this get option in place, every time we retrieve a pizza, the value in the createdAt 
      // field will be formatted by the dateFormat() function and used instead of the default timestamp 
      // value.This way, we can use the timestamp value for storage, but use a prettier version of it for display.
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "large",
    },
    toppings: [],
    // we need to tell Mongoose to expect an ObjectId and to tell
    // it that its data comes from the Comment model.
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Virtuals allow us to add more information to a database 
// response so that we don't have to add in the information 
// manually with a helper before responding to the API request
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});
// , you'll need to add the toJSON property to the schema options. on line 29 to 34




// create the Pizza model using the PizzaSchema
const Pizza = model("pizza", PizzaSchema)

// export the Pizza model
module.exports = Pizza;