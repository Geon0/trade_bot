const express = require('express');
const router = express.Router();

router.use(express.urlencoded({
    extended: true
}));

router.get('/', function(req, res, next) {
    res.send('trade controller');
});

module.exports = router;
