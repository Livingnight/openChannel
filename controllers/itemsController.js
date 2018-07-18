const db = require("../models");


// Defining methods for the itemController
module.exports = {
    findAll: function (req, res) {
        db.Goal
            .find()
            .populate('items')
            .then(dbopenChannel =>

                res.json(dbopenChannel.filter(goal => {
                    return goal.id === req.query._id
                })))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {

        db.Goal
        db.Item


            .findById(req.params.id)
            .populate('items')
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {

        db.Goal
            .findById(req.params.id)
            .then( goal => {
                console.log('goals:',goal);
                db.Item.create({
                    text: req.body.text,
                    author: req.body.author
                }).then( item => {
                    goal.items.push(item);
                    goal.save();
                }).catch( err => {
                    res.status(422).json(err);
                })
            })

        db.Item

            .create(req.body)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));

    },
    update: function(req, res) {
        db.Item

            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Item

            .findById({ _id: req.params.id })
            .then(dbopenChannel => dbopenChannel.remove())
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    }
};
