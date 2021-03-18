const mongosee = require('mongoose')

mongosee.connect('mongodb://mongo-db/covid_db', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((res) => {
        console.log('Database connected to : ', res.connection.host);
    })
    .catch((err) => {
        console.error(err);
    })

