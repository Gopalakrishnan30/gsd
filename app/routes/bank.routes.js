module.exports = app => {
const bank = require("../controllers/bank.controller");
let router = require("express").Router();

app.use('/api/v1/bank', router);

router.post("/create", bank.createAccount);
router.get("/", bank.fetchAllAccounts);
router.post("/update-accounts", bank.updateAccounts);
router.post("/delete-accounts", bank.deleteAccount);
router.post("/calculate-balance", bank.calculateAverageBalance);
router.get("/sort-balance", bank.sortBalanceData);

};