const db = require("../models");


// Defining methods for the booksController
module.exports = {
    findAll: function(req, res) {
        db.Goal
            .find()
            .populate('items')
            .sort({ _id: -1 })
            .then(dbopenChannel => {
                console.log(dbopenChannel)
                const filter = dbopenChannel.filter(goal => goal.author === req.query.author && goal.allEmployee === false);
                res.json(filter)
            })
            .catch(err => res.status(422).json(err));
    },
    findAllEmployee: function(req,res) {
        db.Goal
            .find()
            .populate('items')
            .sort({ created: -1 })
            .then(dbopenChannel => {

                const filter = dbopenChannel.filter(goal => goal.allEmployee === true);
                res.json(filter)
            })
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
        const {title, author, allEmployee} = req.body;
        db.Goal
            .create({
                title,
                allEmployee,
                author
            })
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        console.log(req.body)
        db.Goal
            .findOneAndUpdate({ _id: req.params.id },
                 req.body
            )
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Goal
            .findById({ _id: req.params.id })
            .then(dbopenChannel => {
                dbopenChannel.remove();
                // db.Item.remove({"goalId": ObjectId(`${req.params.id}`)});

            })
            .then(deleteItems => {
                db.Item.find({goalId: req.params.id})
                    .then( items =>{
                        console.log(items);
                        items.remove();
                    })
                    .then(response => res.json(response))
                    .catch(e => res.json(e));
            })
            .catch(err => res.status(422).json(err));
    }
};
