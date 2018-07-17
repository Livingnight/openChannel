const db = require("../models");


// Defining methods for the booksController
module.exports = {
    findAll: function(req, res) {
        db.Goal
            .find()
            .populate('items')
            // .sort({ date: -1 })
            .then(dbopenChannel =>

                // console.log(dbopenChannel.filter( goal => goal.author === 'jjernigan1065@gmail.com')))
                    // console.log(findUser);
                res.json(dbopenChannel.filter( goal => goal.author === req.query.author)))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Goal
            .findById(req.params.id)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        const {title, email} = req.body;
        db.Goal
            .create({
                title: title,
                author: email
            })
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
