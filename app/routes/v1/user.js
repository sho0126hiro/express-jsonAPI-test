var express = require('express');
// routing
var router = express.Router();
// firestore setting
const admin = require('firebase-admin');

var db = admin.firestore();
// GET http://localhost:3000/api/v1/user/test
router.get('/test',function(req,res){
    res.json({
        message:"This is user api"
    });
});

// POST http://localhost:3000/api/v1/user/
router.post('/',function(req,res){
    var userRef = db.collection('users');
    var data = {
        name : req.body.name,
        screen_name : req.body.screen_name,
        bio : req.body.bio
    }
    userRef.add(data,{marge:true}
        ).then(ref=>{
            console.log('success');
            res.json({message:"success",id:ref.id});
        }).catch(function(err){
            console.log(err);
            res.send(err);
    });
})

// すべてのUserデータを取得
// GET http://localhost:3000/api/v1/user/
router.get('/',function(req,res){
    db.collection('users').get()
        .then((snapshot)=>{
            var users = new Array();
            snapshot.forEach((doc)=>{
                users.push(doc.data());
            });
            res.json(users);
        })
        .catch((err)=>{
            res.send(err);
        });
})

router.get('/:id',function(req,res){
    userid = req.params.id;
    db.collection('users').doc(userid).get()
        .then(doc=>{
            res.json(doc.data());
        })
        .catch((err)=>{
            res.send(err);
        });
})

// 更新
router.put('/:id',function(req,res){
    userid = req.params.id;
    var data = {
        name : req.body.name,
        screen_name : req.body.screen_name,
        bio : req.body.bio
    };
    console.log(data);
    var userRef = db.collection('users').doc(userid);
    userRef.update(data)
        .then(ref=>{
            console.log("update success");
            res.json({message:"update success!"})
        }).catch(function(err){
            console.log(err);
            res.send(err);
        })
});

//routerをモジュールとして扱う準備
module.exports = router;
