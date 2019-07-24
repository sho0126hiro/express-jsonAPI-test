var express = require('express');
// routing
var router = express.Router();

router.use('/article',require('./article.js'));
router.use('/user',require('./user.js'));

// GET http://localhost:3000/api/v1/
router.get('/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

//routerをモジュールとして扱う準備
module.exports = router;
