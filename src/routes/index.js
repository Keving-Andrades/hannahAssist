const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        styles: 'homepage',
        documentTitle: 'HannaH'
    });
});

module.exports = router;