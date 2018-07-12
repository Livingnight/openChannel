const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require("./routes");


const app = express();

const PORT = process.env.PORT || 8000;
const MONGDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/openChannel';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
}

app.use(routes);

mongoose.connect(MONGDB_URI, err => {
    if (err) console.log(err);
    else console.log('database connected!')
});

app.post('/add', (req, res) => {
    const user = req.body;
    console.log(`User: ${JSON.stringify(user.email)}`);
    res.json({
        ...req.body
    })
});

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server connected on PORT: ${PORT}`);
});