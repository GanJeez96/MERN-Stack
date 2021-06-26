var assert=require('chai').assert;
var expect =require('chai').expect;
var chai = require('chai');
var chaiHttp=require('chai-http');
var request=require('request');
var should= chai.should();

chai.use(chaiHttp);


    describe(('status'),function(done){
        it(('getusers'),function(done){
           request('http://localhost:8888/users',function(err,res,body){
              expect(res.statusCode).to.equal(200);
              res.body.should.include("first_name");
              done();
           });
        });

        it(('addUser'),function(done){
           chai.request('http://localhost:8888')
               .post('/user')
               .send({
                   "first_name": "MONGODB",
                   "last_name": "mmm",
                   "email": "mm@gmail.com",
                   "password":"testpwd",
                   "retypepwd":"testpwd"

               })
               .end(function(err,res){
                expect(res.statusCode).to.equal(200);
                done();
            })
        });

        it(('Create Project'),function(done){
            chai.request('http://localhost:8888')
                .post('/project')
                .send({
                    "projectid":"1000",
                    "projmngr":"l@l.com",
                    "projname":"UNIT TESTING",
                    "projdes":"UNIT TESTING",
                    "projtype":"UNIT TESTING",
                    "projdate":"UNIT TESTING",
                    "projloc":"UNIT TESTING",
                    "projtasks":"UNIT TESTING"
                })
                .end(function(err,res){
                    expect(res.statusCode).to.equal(200);
                    done();
                })
        });

        it(('Updating profile'),function(done){
            chai.request('http://localhost:8888')
                .put('/editprofile')
                .send({
                    "emailid":"a@a.com",
                    "fname":"UNIT TESTED",
                    "lname":"UNIT TESTED",
                    "pwd":"123",
                    "retypepwd":"123"
                })
                .end(function(err,res){
                    expect(res.statusCode).to.equal(200);
                    done();
                })
        });

        it(('User login'),function(done){
            chai.request('http://localhost:8888')
                .post('/login')
                .send({
                    "email": "t@t.com",
                    "password":"111"
                })
                .end(function(err,res){
                    expect(res.statusCode).to.equal(200);
                    done();
                })

        });

        it(('Deleting user account'),function(done){
            chai.request('http://localhost:8888')
                .delete('/user/mm@gmail.com')
                .end(function(err,res){
                    expect(res.statusCode).to.equal(200);
                    done();
                })

        });

    });