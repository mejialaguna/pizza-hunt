const { Schema, model } = require("mongoose");

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
    },
    size: {
      type: String,
      default: "large",
    },
    toppings: [],
    // we need to tell Mongoose to expect an ObjectId and to tell
    // it that its data comes from the Comment model.
    Comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
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