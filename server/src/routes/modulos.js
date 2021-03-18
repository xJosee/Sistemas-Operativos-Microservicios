const express = require('express');
const router = express.Router();
const controller = require('../controllers/modulos')

router.get('/getProcesos', (req, res) => {
    controller.getProcesos(req, res);
});

router.get('/getRam', (req, res) => {
    controller.getRam(req, res);
});

module.exports = router;