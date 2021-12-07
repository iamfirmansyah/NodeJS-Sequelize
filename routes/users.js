var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World');
});

router.get('/:id', function(req, res) {
    res.json({
        message: `hello my name is ${req.params.id}`,
        app: process.env.APP_NAME
    })
})

module.exports = router;