const covidModel = require('../database/covid.schema');

module.exports = {

    async createRecord(req, res) {
        console.log(req.body);
        const data = new covidModel(req.body);
        await data.save();
        res.status(200).send({ message: 'caso creado correctamente' });
    },

    async readAllRecord(req, res) {
        const datos = await covidModel.find();
        res.status(200).send(datos);
    }

}