const express = require('express');

const router = express.Router();
const { getCovids, getCovidById } = require('./controller');

// list of all Covids - Covid
router.get('/', getCovids);
// get Covid by id - Covid
router.get('/:id', getCovidById);

module.exports = router;
