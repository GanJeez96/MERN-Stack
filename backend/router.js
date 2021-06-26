
const express=require('express');
const router=express.Router();
const user=require('./users');
const project=require('./projects');

//retrieving all users
router.get('/users',function(req,res,next){
    user.find(function(err,users){
        res.json(users);
    })
});

//adding a new user
router.post('/user',function(req,res,next){
    let newuser= new user({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        retypepwd:req.body.retypepwd
    });

    newuser.save(function(err,user){
        if(err)
        {
            res.json({msg:'Failed to add user'});
        }
        else
        {
            res.json({msg: 'User Added'});
            return res.status(200).send();
        }
    })

});

//deleing a specific user
router.delete('/user/:id',function(req,res,next){
    user.remove({email: req.params.id}, function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({msg:"user deleted"});
        }
    });
});


//authlogin
router.post('/login',function(req,res,next){
    pwd=req.body.userpwd;
    user.findOne({email:req.body.username},{password:"password",first_name:"first_name"},function(err,result){

        if(err) throw err;
        if(!result)
        {
           return res.json({success:false,msg:"invalid user id"});//,{msg:"invalid user id"});
        }

        else if(result.password==pwd)
        {
            //uname=result.first_name;
            //console.log(result.first_name);
            //return res.status(200).json(weluser);
           return res.json({success:true,msg:""+result.first_name});//({success:true});//,{msg:"welcome user"});
        }
        else
        {
           return res.json({success:false,msg:"passwords do not match"});//,{msg:"passwords do not match"});
        }
    })
});

//updating user profile
router.put('/editprofile',function(req,res,next){
    user.findOneAndUpdate({email:req.body.emailid},{first_name:req.body.fname,last_name:req.body.lname,password:req.body.pwd,retypepwd:req.body.retypepwd},function(err,result){
       if(err) throw err;
       else
       {
           res.json({msg:"User profile updated"});
       }
    });
});

//finding a particular user
router.post('/finduser',function(req,res,next){
    user.findOne({email:req.body.emailid},{first_name:"first_name",last_name:"last_name",password:"password",retypepwd:"retypepwd"},function(err,result){
        if(err) throw err;
        else if(!result)
        {
            res.json({msg:"User Not found"});
        }
        else
        {
            res.json(result);
        }
    });
});




//Project related methods

//getting the total number of project records
router.get('/prjcount', function(req,res,next){
    project.count(function(err,count){
       return res.json(count);
    });
});

//getting the last records id no
router.get('/lastprjct', function(req,res,next){
    project.findOne({},{projectid:"projectid"},{limit:1},function(err,result){
        if(err)
        {
            res.json({msg:'Error in router.js file'});
        }
        else if(result)
        {

            res.json(result.projectid);
        }
        else
        {
            res.json(0);
        }
    }).sort({$natural: -1});

});


//Saving new projects
router.post('/project', function(req,res,next){
   let newproject = new project({
       projectid:req.body.projectid,
       projmngr:req.body.projmngr,
       projname:req.body.projname,
       projdes:req.body.projdes,
       projtype:req.body.projtype,
       projdate:req.body.projdate,
       projloc:req.body.projloc,
       projtasks:req.body.projtasks
   });
   newproject.save(function(err){
       if(err)
       {
           res.json({msg:'Failed to add project'});
       }
       else
       {
           res.json({msg: 'project Added'});
       }
   });
});

//finding and returning projects of a particular user
router.post('/projects',function(req,res,next){
   project.find({projmngr:req.body.emailid},{projname:"projname",projdate:"projdate"},function(err,result){
       if(err) throw err;
       else if(!result)
       {
           return res.json({success:false,msg:"invalid user id"});
       }
       else
       {
           return res.json(result);
       }
   })
});

//deleting a specific project
router.delete('/delproject/:projid',function(req,res,next){
    project.remove({_id: req.params.projid}, function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({msg:"project deleted"});
        }
    });
});

//deleting projects related to a particular user
router.delete('/delprojects/:usrmail',function(req,res,next){
    project.remove({projmngr: req.params.usrmail}, function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({msg:"project deleted"});
        }
    });
});

//finding a particular project
router.post('/findproject',function(req,res,next){
   project.findOne({_id: req.body.objid},{projname:"projname",projdes:"projdes",projtype:"projtype",projdate:"projdate",projloc:"projloc",projtasks:"projtasks"},function(err,result){
      if(err) throw err;
      else if(!result)
      {
          res.json({msg:"project Not found"});
      }
      else
      {
          res.json(result);
      }
   });
});

//updating a particular project
router.put('/updateproj',function(req,res,next){
    project.findByIdAndUpdate(req.body.pjtid,{projname:req.body.projname,projdes:req.body.projdes,projtype:req.body.projtype,projdate:req.body.projdate,projloc:req.body.projloc,projtasks:req.body.projtasks},function(err,result){
        if(err) throw err;
        else
        {
            res.json({msg:"successfully updated"});
        }

        //{projname:req.body.projname,projdes:req.body.projdes}

    });
});

module.exports=router;