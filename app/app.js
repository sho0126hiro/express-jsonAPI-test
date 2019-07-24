var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

const admin = require('firebase-admin');
var serviceAccount = require('../credential/firestore-test-6f4e4-4fb49ac22aa1.json');
// init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定
var router = require('./routes/v1/');
app.use('/api/v1',router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
