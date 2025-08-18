module.exports = app => {
    const Clients = require("../controllers/client.controller.js");
    var router = require("express").Router();

    // Create a new Client
    router.post("/", Clients.create);

    // Retrieve all Clients
    router.get("/", Clients.findAll);

    // Retrieve a single Client with id
    router.get("/:id", Clients.findOne);

    // Update a Client with id
    router.put("/:id", Clients.update);

    // Delete a Client with id
    router.delete("/:id", Clients.delete);

    // Delete all Clients
    router.delete("/", Clients.deleteAll);

    app.use("/api/clients", router);
};
