module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");
    let router = require("express").Router();
    const auth = require("../middleware/auth");

    app.use('/api/v1/tutorials', router);
    router.post("/", tutorials.create);
    router.get("/", tutorials.findAll);
    router.get("/:id", tutorials.findOne);
    router.patch("/:id", tutorials.update); //update particular field
    router.put("/:id", tutorials.updateData); //For upsert and update all.Pass req param or in body.
    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);

    // Ref URL: https://www.bezkoder.com/node-js-express-sequelize-mysql/
    //https://www.youtube.com/watch?v=LJajkjI5RHE
    //PUT and PATCH are idempotent.State of resource is changed only once even after multiple request.
};
