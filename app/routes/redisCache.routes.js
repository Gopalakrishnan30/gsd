module.exports = app => {
  const redisCaching = require("../controllers/redisCaching.controller");
  let router = require("express").Router();
  app.use('/api/redis-caching', router);

  router.get("/fish/:species", redisCaching.getSpeciesData);

};
