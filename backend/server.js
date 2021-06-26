
//var express=require('express');
var mongoose = require('mongoose');
//var bodyparser=require('body-parser');
//var cors=require('cors');
//var path=require('path');

//var app= express();
//const portno=8888;
//const route= require('./router');

const mongodb='mongodb://localhost:27017/projectdb';

function mongocon(){
    mongoose.connect(mongodb);

    mongoose.connection.on('connected',function(){
        console.log('Connected to mongodb @ 27017');
    });

    mongoose.connection.on('error',function(err){
       if(err)
       {
           console.log("Error in db connection: "+err);
       }
    });
}

/*
function serverstart()
{
   // function onrequest(req,res) {
    var route= require('./router')
        app.use(cors());
        app.use(bodyparser.json);
        app.use(route);
        app.get('/', function (req, res) {
            res.send('foobar');
        });
    //}

    app.listen(portno,function(){
       console.log("Server started at port: "+portno);
    });

}
*/


exports.dbconnect=mongocon();
//exports.svrstart=serverstart;