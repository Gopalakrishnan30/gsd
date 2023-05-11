module.exports = app => {
    const user = require("../controllers/user.controller");
    let router = require("express").Router();

    app.use('/api/v1/users', router);

    router.post('/', user.create);
    router.get('/:id', user.findOne);
    router.patch('/:id', user.update);
    router.get('/', user.findAll);
    router.delete('/:id', user.destroy);

    // Reference: https://techvblogs.com/blog/build-crud-api-with-node-express-mongodb

};
