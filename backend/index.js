
var server = require('./server');
const route= require('./router');

//server.dbconnect;
//server.svrstart();


var cors = require('cors');
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
const port=8888;

//adding middleware = cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
//app.use(express.static(path.join(__dirname,'public')));

//routes
app.use(route);

//testing server
app.get('/',function(req,res){
    res.send("foobar");
})

app.get('//',function(req,res){
    res.send("testing");
});

app.get('/abc',function(req,res){
    res.send("/abc passed");
})

app.listen(port,function(){
    console.log("Server started at port: "+port);
})




