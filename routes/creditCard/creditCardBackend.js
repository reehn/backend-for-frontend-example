"use strict";

const db = require("../../db/fakeDb");
const {render404} = require("../../helpers/errorHelper")
const validator = require("../../helpers/validator")

const joi = require("joi");

const getCreditCardInfoByCompanyIdParamsSchema = joi.object().keys({
    companyId: joi.string().required().min(3).max(10) // should really be .guid() but doing this for test-case
})

const getCreditCardInfoByCompanyIdQuerySchema = joi.object().keys({
    exclude: joi.string().optional().valid("transactions", "invoices")
})

function getCreditCardInfoByCompanyId(req, res) {
    const {companyId} = req.params;
    const {exclude} = req.query;

    const creditCard = db.getCreditCardByCompanyId(companyId);

    if (!creditCard) {
        return render404(res, `Couldn't find any company with id ${companyId}`)
    }

    const response = creditCardMapper(creditCard, exclude)
    res.status(200).json(response)
}

function creditCardMapper(creditCard, exclude) {
    const ret = {...creditCard};
    if (exclude) delete ret[exclude]
    return {
        ...ret
    }
} 

module.exports = {
    getCreditCardInfoByCompanyId: [validator.params(getCreditCardInfoByCompanyIdParamsSchema), validator.query(getCreditCardInfoByCompanyIdQuerySchema), getCreditCardInfoByCompanyId]
}