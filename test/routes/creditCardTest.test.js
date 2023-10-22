"use strict";

const { get } = require("../helpers/request-helpers");

describe("Credit card endpoint", () => {
    it("We can get a creditcard by companyId", async () => {
        const expected = require("../data/creditCard.json")
        const response = await get("/creditcard/company/123");

        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expected));
    });

    it("We can get a creditcard by companyId and exclude transactions", async () => {
        const expected = { ...require("../data/creditCard.json") }
        delete expected.transactions;
        const response = await get("/creditcard/company/123?exclude=transactions");

        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expected));
    });

    
    it("We can get a creditcard by companyId and exclude invoices", async () => {
        const expected = { ...require("../data/creditCard.json") }
        delete expected.invoices;
        const response = await get("/creditcard/company/123?exclude=invoices");

        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expected));
    });

    it("We respond with a 404 when we can't find a company", async () => {
        const expectedError = { error: { status: 404, title: "Not Found", detail: "Couldn't find any company with id 12345" } };
        const response = await get("/creditcard/company/12345");

        expect(response.status).toBe(404);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedError));
    });

    it("We respond with a validation error on bad input in params", async () => {
        const expectedError = {
            error: {
                title: "ValidationError in params",
                status: 400,
                source: "params[companyId]",
                detail: '"companyId" length must be at least 3 characters long'
            }
        };
        const response = await get("/creditcard/company/12");

        expect(response.status).toBe(400);
        console.log('JSON.stringify(response.body) :>> ', JSON.stringify(response.body));
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedError));
    });

    it("We respond with a validation error on bad input in query", async () => {
        const expectedError = {
            error: {
                title: "ValidationError in query",
                status: 400,
                source: "query[exclude]",
                detail: '"exclude" must be one of [transactions, invoices]'
            }
        };
        const response = await get("/creditcard/company/123?exclude=badInput");

        expect(response.status).toBe(400);
        console.log('JSON.stringify(response.body) :>> ', JSON.stringify(response.body));
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedError));
    });
});