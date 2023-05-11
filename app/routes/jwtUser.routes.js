module.exports = app => {
    const jwtUser = require("../controllers/jwtUser.controller");
    let router = require("express").Router();
    const auth = require("../middleware/auth");

    app.use('/api/v1/jwt/users', router);

    router.post("/register", jwtUser.register);
    router.post("/login", jwtUser.login);
    router.post("/test-jwt",auth, jwtUser.testJwt);

    //Ref URL: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
};
