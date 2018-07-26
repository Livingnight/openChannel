const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require("./routes");


const app = express();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/openChannel';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));



app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server connected on PORT: ${PORT}`);
});