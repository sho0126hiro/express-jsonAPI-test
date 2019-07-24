var express = require('express');
var moment = require('moment');
// routing
var router = express.Router();
const admin = require('firebase-admin');
var db = admin.firestore();
// GET http://localhost:3000/api/v1/article/test
router.get('/test',function(req,res){
    res.json({
        message:"This is article api"
    });
});

router.post('/',function(req,res){
    var ref = db.collection('articles');
    var data = {
        title : req.body.title,
        text : req.body.text,
        timestamp : moment().toString()
    }
    ref.add(data)
        .then(ref=>{
            console.log('success');
            res.json({message:"success",id:ref.id});
        }).catch(function(err){
            console.log(err);
            res.send(err);
    });

})


router.get('/',function(req,res){
    db.collection('articles').get()
        .then((snapshot)=>{
            var articles = new Array();
            snapshot.forEach((doc)=>{
                articles.push(doc.data());
            });
            res.json(articles);
        })
        .catch((err)=>{
            res.send(err);
        });
})

router.get('/:id',function(req,res){
    articleid = req.params.id;
    db.collection('articles').doc(articleid).get()
        .then(doc=>{
            res.json(doc.data());
        })
        .catch((err)=>{
            res.send(err);
        });
})

router.delete('/:id',function(req,res){
    articleid = req.params.id;
    db.collection('articles').doc(articleid).delete()
        .then(()=>{
            res.json({message:"delete success"})
        })
        .catch((err)=>{
            res.send(err);
        });
});

//routerをモジュールとして扱う準備
module.exports = router;
