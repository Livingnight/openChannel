const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 8000;
const MONGDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/openChannel';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(MONGDB_URI, err => {
    if (err) console.log(err);
    else console.log('database connected!')
});

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server connected on PORT: ${PORT}`);
})