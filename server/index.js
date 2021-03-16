const express = require('express');
const app = express();
const cors = require('cors')
// routes 
const ModulosRoute = require('./src/routes/modulos');
const CovidRoute = require('./src/routes/covid');
//mongo db connection
require('./src/database/database');

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/modulos', ModulosRoute)
app.use('/covid', CovidRoute)

app.listen(4000, () => {
    console.log('server on port 4000');
});

