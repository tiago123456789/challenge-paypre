const chai = require("chai");
const sinon = require("sinon");
const supertest = require("supertest");
const app = require("../../src/config/Server");

global.request = supertest(app);
global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;