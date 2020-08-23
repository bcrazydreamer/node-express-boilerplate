const express = require('express');

const router = express.Router();

router.post('/ping', (req, res) => res.send("pong"));

module.exports = router;