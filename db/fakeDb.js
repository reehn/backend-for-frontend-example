"use strict";

const fakeCreditCards = require("./fakeCreditCards.json")

function getCreditCardByCompanyId(id) {
    return fakeCreditCards.find(c => c.companyId === id);
}

module.exports = {
    getCreditCardByCompanyId
}