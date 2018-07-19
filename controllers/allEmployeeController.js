const db = require("../models");


// Defining methods for the booksController
module.exports = {
    findAll: function(req, res) {
        db.Goal
            .find(req.query)
            .sort({ date: -1 })
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    findOne: function(req, res) {
        db.Goal
            .findOne(req.query)
            .sort({ field: -_id })
            .limit(1)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Goal
            .findById(req.params.id)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Goal
            .create(req.body)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Goal
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Goal
            .findById({ _id: req.params.id })
            .then(dbopenChannel => dbopenChannel.remove())
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    }
};

