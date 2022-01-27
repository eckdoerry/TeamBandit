const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');

router.get("/", authorization, async(req, res) => {
  try {
      
    // Query goes here
      res.json();

  } catch (error) {
      console.error(error.message);
  }
});