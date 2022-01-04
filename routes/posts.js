const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    //req.user contains the user ID as well as the time the token for the user was generated.
    res.json({
        bugs: {
            title: 'this does not work',
            description: 'you can not see this fucker'
        }
    });
});


module.exports = router;