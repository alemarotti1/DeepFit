const express = require('express');
const router = express.Router();
const db = require("mysql");

/* do nothing */
router.get('/', function(req : any, res : any) {
  res.send('');
});

module.exports = router;
