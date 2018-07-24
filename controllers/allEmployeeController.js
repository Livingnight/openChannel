const db = require("../models");


// Defining methods for the booksController
module.exports = {
    findAll: function(req, res){
    db.AllEmployees
    .find()
        .populate('items')
        .limit(1)
        .sort({created: -1})
    .then( goals => {
        console.log(goals);
        res.json(goals);
    })
        // db.AllEmployees
        //     .find()
        //     // .populate('items')
        //     // .limit(1)
        //     // .sort({ created: -1 })
        //     .then(dbopenChannel => {
        //         console.log(dbopenChannel);
        //         // const filter = dbopenChannel.filter(goal => goal.allEmployee === req.query.allEmployee);
        //         res.json(dbopenChannel)
        //     })
        //     .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.AllEmployees
            .findById(req.params.id)
            .populate('items')
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        const {title, email} = req.body;
        db.AllEmployees
            .create({
                title: title,
                author: email
            })
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        console.log(req.body);
        db.AllEmployees
            .findOneAndUpdate({ _id: req.params.id },
                req.body
            )
            .then(dbopenChannel => res.json(dbopenChannel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.AllEmployees
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