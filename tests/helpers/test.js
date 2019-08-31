const chai = require("chai");
const sinon = require("sinon");
require("../../src/config/LoaderEnvironmentVariable");

global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;