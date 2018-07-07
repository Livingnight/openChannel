


const verifyId = (req, res, next) => {
    // TODO
    // Make sure you have a solid validation
    const sub = req.body.sub;

    if(sub.length === 29) {
        next();
    } else {
        res.status(501).json({
            error: true,
            message: 'Sorry, you do not have access to this API'
        })
    }
};

module.exports = {
    verifyId
}