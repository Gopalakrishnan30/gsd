module.exports = app => {
    const pgUser = require("../controllers/pgUser.controller");
    let router = require("express").Router();

    app.use('/api/v1/pg-users', router);

    router.get('/users', pgUser.getUsers)
    router.get('/users/:id', pgUser.getUserById)
    router.post('/users', pgUser.createUser)
    router.put('/users/:id', pgUser.updateUser)
    router.delete('/users/:id', pgUser.deleteUser)
    
    // Reference: https://www.atatus.com/blog/building-crud-rest-api-with-node-js-express-js-and-postgresql/

};
