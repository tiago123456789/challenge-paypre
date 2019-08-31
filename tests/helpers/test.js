const chai = require("chai");
const sinon = require("sinon");
const supertest = require("supertest");
const database = require("./Database");
const app = require("../../src/config/Server");
const auth = require("./Auth");

global.authHelper = auth;
global.database = database;
global.request = supertest(app);
global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;