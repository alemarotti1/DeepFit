const express = require('express');
const router = express.Router();

/* do nothing */
router.get('/', function(req, res) {
  res.send('');
});

module.exports = router;
