const express = require('express');
const router = express.Router();
const controller = require('../controllers/covid')

router.post('/postData', (req, res) => {
    controller.createRecord(req, res);
});

module.exports = router;