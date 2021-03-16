const covidModel = require('../database/covid.schema');

module.exports = {

    createRecord(req, res) {
        const data = new covidModel(req.body);
        data.save();
        res.status(200).send({ message: 'caso creado correctamente' });
    }

}