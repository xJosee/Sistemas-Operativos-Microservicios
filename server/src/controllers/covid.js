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
        const peten = ['Petén'];
        const franja_transversal_del_norte = ['Huehuetenango', 'Izabal', 'Alta Verapaz'];
        const oriente = ['Zacapa', 'El Progreso', 'Chiquimula', 'Izabal', 'Jutiapa', 'Jalapa', 'Santa Rosa'];
        const litoral_del_pacifico = ['Jutiapa', 'Santa Rosa', 'Escuintla', 'Suchitepéquez', 'Retalhuleu', 'San Marcos', 'Quetzaltenango'];

        var datos = await covidModel.aggregate([
            {
                $facet: {
                    peten: [
                        {
                            $match: {
                                location: { $in: peten }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    franja_transversal_del_norte: [
                        {
                            $match: {
                                location: { $in: franja_transversal_del_norte }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    oriente: [
                        {
                            $match: {
                                location: { $in: oriente }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    litoral_del_pacifico: [
                        {
                            $match: {
                                location: { $in: litoral_del_pacifico }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    sin_region: [
                        {
                            $match: {
                                location: {
                                    $and: [{ $not: { $in: peten } }, { $not: { $in: franja_transversal_del_norte } }, { $not: { $in: oriente } }, { $not: { $in: litoral_del_pacifico } }]
                                }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ]);

        res.status(200).send(datos);
    },

    async getTop5(req, res) {
        var datos = await covidModel.aggregate([
            {
                $group: {
                    _id: "$location",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        res.status(200).send(datos);
    },

    async getLast5(req, res) {
        var datos = await covidModel.aggregate([
            { $limit: 5 }
        ]).sort({ _id: -1 });
        res.status(200).send(datos);
    },

    async groupByState(req, res) {
        var datos = await covidModel.aggregate([
            {
                $group: {
                    _id: "$state",
                    count: { $sum: 1 }
                }
            },
        ]);
        res.status(200).send(datos);
    },

    async groupByInfectedType(req, res) {
        var datos = await covidModel.aggregate([
            {
                $group: {
                    _id: "$infectedtype",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        res.status(200).send(datos);
    },

    async getDataByAgeRange(req, res) {
        var datos = await covidModel.aggregate([
            {
                $facet: {
                    "0-9": [
                        {
                            $match: {
                                age: { $gte: 0, $lte: 9 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "10-19": [
                        {
                            $match: {
                                age: { $gte: 10, $lte: 19 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "20-29": [
                        {
                            $match: {
                                age: { $gte: 20, $lte: 29 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "30-39": [
                        {
                            $match: {
                                age: { $gte: 30, $lte: 39 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "40-49": [
                        {
                            $match: {
                                age: { $gte: 40, $lte: 49 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "50-59": [
                        {
                            $match: {
                                age: { $gte: 50, $lte: 59 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "60-69": [
                        {
                            $match: {
                                age: { $gte: 60, $lte: 69 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "70-79": [
                        {
                            $match: {
                                age: { $gte: 70, $lte: 79 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "80-89": [
                        {
                            $match: {
                                age: { $gte: 80, $lte: 89 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "90-99": [
                        {
                            $match: {
                                age: { $gte: 90, $lte: 99 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    "100-109": [
                        {
                            $match: {
                                age: { $gte: 100, $lte: 109 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ]);
        res.status(200).send(datos[0]);
    }

}