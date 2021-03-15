const mongosee = require('mongoose')

mongosee.connect('mongodb://mongo-db/covid_db')
    .then((res) => {
        console.log('Database connected to : ', res.connection.host);
    })
    .catch((err) => {
        console.err(err);
    })