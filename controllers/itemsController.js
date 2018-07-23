const db = require("../models");


// Defining methods for the itemController
module.exports = {
    findAll: function (req, res) {
        db.Goal
            .find()
            .sort({_id: -1})
            .populate('items')
            .then(dbopenChannel =>

                res.json(dbopenChannel.filter(goal => {
                    return goal.id === req.query._id
                })))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Goal
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
                    author: req.body.author,
                    goalId: req.params.id
                }).then( item => {
                    goal.items.push(item);
                    goal.save();
                }).then( response => {
                    res.json(response);
                }).catch( err => {
                    res.status(422).json(err);
                })
            })
    },
    update: function(req, res) {
        db.Item
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Item
            .findByIdAndRemove({_id: req.params.id})
            .then(removedItemFromGoal => {
                // console.log(removedItemFromGoal);
                // console.log(`body: ${JSON.stringify(req.query)}`);
                db.Goal.findByIdAndUpdate(
                    {_id: req.query.id},
                    {$pull: {items: req.params.id}},
                    {new: true})
                    .then(goal => {
                        res.json(goal);
                    })
            })
            .catch(err => res.status(422).json(err));
    }
};
