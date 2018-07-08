const express = require ('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const moment   = require ('moment');
const db = require("../models");

const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            _id,
            username
        }
    }, 'someone');
    return token;
};

// signup post to create new user
apiRouter.post("/signup", (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.openChannel.findOne({username})
        .then((user) => {
            if (user) {
                return res.status(409).json({error: "User already exists"});
            }

            const create_user = new db.openChannel({
                username,
                password: hash
            });
            create_user.save((err, user) => {
                if (err) {
                    return err;
                }

                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
});

// signin post
apiRouter.post("/signin", (req, res) => {
    const {username, password} = req.body;

    db.openChannel.findOne({username})
        .then((user) => {
            if (bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "User is signed in"});
            } else {
                res.status(400).json({error: 'Password does not match'});
            }
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });

});

// verifies cookies from login
const verifyCookie = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, 'done', (err, decoded) => {
        if(err){
            res.status(401).json({error:"Access Denied"});
        } else{
            next();
        }
    });

};

// posts a daily mood
apiRouter.post('/pages/goal', (req,res) => {
    const {username, year, month, day, goal} = req.body;
    db.Goals.create({goal: goal})
        .then((dbGoals) => {
            return db.openChannel.findOneAndUpdate({username: username}, {$addToSet: {goal: dbopenChannel._id}}, {new: true});
        })
        .then((dbUser) => {
            res.send(true);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({err: "Connection error"});
        });
});

// checks for daily mood
apiRouter.post('/goal', (req, res) => {
    const {username, year, month, day} = req.body;

    //checks to see if a user exits
    db.openChannel.findOne({username: username})
        .then((userData) => {
            //checks to see if a user has any moods logged yet
            if (userData.goal.length > 0) {
                db.openChannel.findOne({username: username})
                    .populate("goal")
                    .then((userGoals) => {
                        const lastPostDate = moment(userGoals.goal[userGoals.goal.length - 1].date);


                        //checks to see if a user has logged a mood today
                        if (lastPostDate.year() === year && lastPostDate.month() === month && lastPostDate.date() === day) {
                            res.send(true);
                        }
                        else {
                            //if a user has not logged a mood today then allow them to log a mood
                            res.send(false);
                        }
                        // res.json(userTrends.mood);
                    })
                    .catch((err) => {
                        console.log("didn't populate mood data correctly");
                        res.status(400).json({err: "Connection error"});
                    });
            }
            else {
                res.send(false);
            }
        });


});

// gets trends data
apiRouter.get('/goal/Goals/:username', (req, res) => {

    db.openChannel.findOne({username: req.params.username})
        .populate("goal")
        .then((userGoals) => {
            res.json(userGoals.goal);
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
});

// gets previous trends data
apiRouter.get('/goal/Goals/prevdata/:username', (req, res) => {

    db.openChannel.findOne({username: req.params.username})
        .populate("goal")
        .then((prevData) => {
            res.send(prevData.goal);
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        })

});

apiRouter.get('/user', verifyCookie, (req, res) => {
    res.json({msg: "Cookie verified"});
});

module.exports = apiRouter;
