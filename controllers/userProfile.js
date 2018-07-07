// Module Design Pattern 
/*
    const UserProfile = (() => {


        // Features
        return {

        };
    })();
*/


// The Prototype Design Pattern
const UserProfile = {
    changeUsername: (req, res, next) => {
        // TODO

        res.json({
            status: 'success',
            username: 'Testing',
            age: 5
        });
    }
};

module.exports = UserProfile;