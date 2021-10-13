const { Pizza } = require("../models/index");

// We'll create all of these functions as methods of the pizzaController object. Because these methods will
// be used as the callback functions for the Express.js routes, each will take two parameters: req and res.

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
    // used the select option inside of populate(), so that we can tell Mongoose that we don't care about the 
    // __v field on comments either.The minus sign - in front of the field indicates that we don't want it to 
    // be returned.If we didn't have it, it would mean that it would return only the __v field.
    Pizza.find({})
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },


    



  // get one pizza by id
  getPizzaById({ params }, res) {
    //   .findOne() method to find a single pizza by its _id.Instead of accessing the entire req,
    // we've destructured params out of it, because that's the only data we need for this request to be fulfilled
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza
  //     With this .createPizza() method, we destructure the body out of the Express.js
  //   req object because we don't need to interface with any of the other data it provides.
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json({ dbPizzaData , message: 'pizza created'}))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    // .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and
    // returns the updated document.If we don't set that third parameter, { new: true }, it will return the
    // original document.By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json({
          dbPizzaData,
          message: 'pizza updated'
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    // .findOneAndDelete() method, which will find the document to be returned and also delete it from the database.
    // Like with updating, we could alternatively use .deleteOne() or .deleteMany(), but we're using the .findOneAndDelete()
    // method because it provides a little more data in case the client wants it.
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        } else {
          res.json({
              dbPizzaData,
              message: "pizza deleted"
            })
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
