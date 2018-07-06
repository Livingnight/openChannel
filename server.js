const express = require('express'); // hapijs
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');
const {
    verifyId
} = require('./utils/coreHelper');

const app = express();

const PORT = process.env.PORT || 8000;
const MONGDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/openChannel';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect(MONGDB_URI, err => {
    if (err) console.log(err);
    else console.log('database connected!')
});

app.use(express.static('/client/src/build')); // TODO


app.use('/', routes); // configure routes



app.post('/add', verifyId, (req, res) => {
    const user = req.body;

    // TODO
    // Business logic
    console.log('User: ', user);

    res.json({
        ...req.body
    })
});


app.get('/', verifyId, (req, res) => {
    // TODO
    // just an example
});

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server connected on PORT: ${PORT}`);
})