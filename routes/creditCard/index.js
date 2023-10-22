"use strict";

const express = require('express');
const router = express.Router();
const creditCards = require("./creditCardBackend");

router.get('/', (req, res, next) => {
  res.status(200).send("Credit card router ready to serve");
});

router.get("/company/:companyId", creditCards.getCreditCardInfoByCompanyId);

module.exports = router;
