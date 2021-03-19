const covidModel = require('../database/covid.schema');

module.exports = {

    async createRecord(req, res) {
        var values = req.body;
        console.log(values);
        const data = new covidModel(req.body);
        await data.save();
        res.status(200).send({ message: 'caso creado correctamente' });
    },

    async readAllRecord(req, res) {
        const datos = await covidModel.find();
        res.status(200).send(datos);
    },

    async filterByWay(req, res) {
        var way = req.params.way;
        const datos = await covidModel.find({ way: way });
        res.status(200).send(datos);
    },

    async filterByRegion(req, res) {
        var way = req.params.region;
        var locations = [];
        switch (way) {
            case 'peten':
                locations = ['Petén'];
                break;
            case 'franja-transversal-del-norte':
                locations = ['Huehuetenango', 'Izabal', 'Alta Verapaz'];
                break;
            case 'oriente':

                break;
        }
        var datos = await covidModel.find({ way: { $in: locations } });
        res.status(200).send(datos);
    }

}