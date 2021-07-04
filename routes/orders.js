const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
console.log(Orders);

router.route("/").get((req, res) => {
  Orders.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newOrders = new Orders({
    username,
    description,
    duration,
    date,
  });

  newOrders
    .save()
    .then(() => res.json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Orders.findById(req.params.id)
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Orders.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Orders.findById(req.params.id)
    .then((orders) => {
      orders.username = req.body.username;
      orders.description = req.body.description;
      orders.duration = Number(req.body.duration);
      orders.date = Date.parse(req.body.date);

      orders
        .save()
        .then(() => res.json("Orders updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
