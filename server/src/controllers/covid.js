const covidModel = require('../database/covid.schema');

module.exports = {

    async createRecord(req, res) {
        var values = req.body;
        console.log(values);
        const data = new covidModel(
            values.name,
            values.location,
            values.age,
            values.infectedtype,
            values.way
        );
        await data.save();
        res.status(200).send({ message: 'caso creado correctamente' });
    },

    async readAllRecord(req, res) {
        const datos = await covidModel.find();
        res.status(200).send(datos);
    }

}