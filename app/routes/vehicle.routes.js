module.exports = app => {
    const Vehicles = require("../controllers/vehicle.controller.js");
    var router = require("express").Router();

    router.post("/", Vehicles.create);
    router.get("/", Vehicles.findAll);
    router.get("/:id", Vehicles.findOne);
    router.put("/:id", Vehicles.update);
    router.delete("/:id", Vehicles.delete);
    router.delete("/", Vehicles.deleteAll);

    app.use("/api/vehicles", router);
}