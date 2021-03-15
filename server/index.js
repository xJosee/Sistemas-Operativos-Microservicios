const express = require('express');
const app = express();
const cors = require('cors')
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

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the covid API' });
});

app.get('/getProcesos', (req, res) => {
    fs.readFile('/usr/src/app/proc/', 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            res.send(JSON.parse(data.replace(",]", "]")));
        }
    });
});

app.get('/getRam', (req, res) => {
    fs.readFile('./proc/rammmodule', 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/postData', (req, res) => {
    console.log(req.body)

    res.send({ message: 'Works' });

})

app.listen(4000, () => {
    console.log('server on port 4000');
})

