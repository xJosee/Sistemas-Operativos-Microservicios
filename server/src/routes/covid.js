const express = require('express');
const router = express.Router();
const controller = require('../controllers/covid')

router.post('/postData', (req, res) => {
    controller.createRecord(req, res);
});

router.get('/', (req, res) => {
    controller.readAllRecord(req, res);
});

module.exports = router;