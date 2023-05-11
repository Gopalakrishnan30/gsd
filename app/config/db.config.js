module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "gsd-crud",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  MONGO_URL:"mongodb+srv://gopal:W9Y8NWbbJiElOvJ8@cluster0.qwg1jgw.mongodb.net/bank"
};
