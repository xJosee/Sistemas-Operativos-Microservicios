const express = require('express');
const router = express.Router();
const controller = require('../controllers/covid')

router.post('/postData', (req, res) => {
    controller.createRecord(req, res);
});

router.get('/', (req, res) => {
    controller.readAllRecord(req, res);
});

router.get('/way/:way', (req, res) => {
    controller.filterByWay(req, res);
});

router.get('/region', (req, res) => {
    controller.filterByRegion(req, res);
});

router.get('/top', (req, res) => {
    controller.getTop5(req, res);
});

router.get('/last', (req, res) => {
    controller.getLast5(req, res);
});

router.get('/state', (req, res) => {
    controller.groupByState(req, res);
});

router.get('/infectedType', (req, res) => {
    controller.groupByInfectedType(req, res);
});

router.get('/ageRange', (req, res) => {
    controller.getDataByAgeRange(req, res);
});



module.exports = router;