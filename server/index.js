const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the covid API' });
});

app.listen(3000, () => {
    console.log('server on port 3000');
})

