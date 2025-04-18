const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.resolve('src/client')));
app.use('/styles', express.static(path.resolve('src/client/styles')));
app.use('/javascript', express.static(path.resolve('src/client/javascript')));

app.use('/landing', express.static(path.resolve('src/client/pages/landing')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/landing/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('listening on the port', process.env.PORT);
});