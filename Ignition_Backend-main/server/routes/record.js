
const express = require("express");
 

const recordRoutes = express.Router();
 
const dbo = require("../db/conn");
const { route } = require("express/lib/router");

module.exports = route;