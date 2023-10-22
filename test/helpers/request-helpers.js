"use strict";

const request = require("supertest");
const pathLib = require("path")

const app = require("../../app")

function get(path, contentType="application/json") {
    return request(app)
        .get(path)
        .set("Content-Type", contentType)
        .set("Host", "api.example.com")
        .expect("Content-type", new RegExp(contentType));
}

module.exports = {
    get
}