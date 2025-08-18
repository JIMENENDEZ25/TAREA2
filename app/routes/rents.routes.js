module.exports = app => {
    const Rentals = require("../controllers/rent.controller.js");
    var router = require("express").Router();

    // Create a new Rental
    router.post("/", Rentals.create);

    // Retrieve all Rentals
    router.get("/", Rentals.findAll);

    // Retrieve a single Rental with id
    router.get("/:id", Rentals.findOne);

    // Update a Rental with id
    router.put("/:id", Rentals.update);

    // Delete a Rental with id
    router.delete("/:id", Rentals.delete);

    // Delete all Rentals
    router.delete("/", Rentals.deleteAll);

    app.use("/api/rentals", router);
}