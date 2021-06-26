import { Component, OnInit } from '@angular/core';
import {UserregService} from '../userreg.service';
import {Router} from '@angular/router';
//import {newusers} from '../regusers';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css'],
  providers:[UserregService]
})
export class UserregComponent implements OnInit {


  //the below defined variable names should be used in the component.html file, under the form section.
  //for each input types the [(ngModel)] and the "name" attribute should have the same name defined below.
  first_name: String;
  last_name: String;
  email: String;
  password:String;
  retypepwd:String;

  //loginusers: newusers[];
  //chkuser: newusers;
  //db:DashboardComponent;


  constructor(private fs:UserregService,private router:Router, private ds:DashboardService) {

  }

  ngOnInit() {
  }

  addUser()
  {

    const newUser={
      first_name: this.first_name,
      last_name:this.last_name,
      email: this.email,
      password: this.password,
      retypepwd: this.retypepwd
    }
    const chckuser={
      emailid:this.email
    }

    //console.log(newUser);

    if((this.first_name=="")||(newUser.last_name=="")||(newUser.email=="")||(newUser.password=="")||(newUser.retypepwd==""))
    {
      alert("All fields must be filled out");

    }
    else if((this.first_name==undefined)||(newUser.last_name==undefined)||(newUser.email==undefined)||(newUser.password==undefined)||(newUser.retypepwd==undefined))
    {
      alert("All fields must be filled out");
    }
    else if(newUser.password!=newUser.retypepwd)
    {
      alert("Passwords do not match");
    }
    else {

      /*

      this.fs.registerUser(newUser).subscribe(user => {
        console.log(user);
      })
      alert("Registration Successful");
      this.first_name="";
      this.last_name="";
      this.email="";
      this.password="";
      this.retypepwd="";
      */

      const checkemail={
        username:this.email,
        userpwd:this.password
      }

      this.fs.loginuser(checkemail).subscribe(data =>{
        if(((!data.success)&&(data.msg=="invalid user id")))
        {
          this.fs.registerUser(newUser).subscribe(user => {
            console.log(user);
          })
          alert("Registration Successful");
          this.first_name="";
          this.last_name="";
          this.email="";
          this.password="";
          this.retypepwd="";
        }
        else{
          alert("The Email ID entered is already in use. Please enter a different Email ID.");
        }
      })

    }
  }

  username: String;
  userpwd:String;

loginuser() //routerLink="dashboard"
{
   const curruser={
    //the below mentioned attribute names should be used in req.body."name" in the router.js file
    username:this.username,
    userpwd:this.userpwd
  }
  //console.log(curruser);



  this.fs.loginuser(curruser).subscribe(data => {
    //console.log(user);

    if(data.success)
    {
      //this.ds.assignuser(this.username);
      this.ds.assignuser(data.msg);
      this.ds.setEmail(this.username);
      this.router.navigate(['dashboard']);

    }
    else if((!data.success)&&(data.msg=="invalid user id")) {
      alert("Invalid User id");
    }
    else if((!data.success)&&(data.msg=="passwords do not match")) {
      alert("Invalid Password");
    }
  })

}








/*
  addUser(event)
  {
    event.preventDefault()
    const target = event.target;

    const newUser={
      first_name: target.querySelector('#first_name').value,
      last_name: target.querySelector('#last_name').value,//this.last_name,
      email: target.querySelector('#email').value,//this.email,
      password: target.querySelector('#password').value,//this.password,
      retypepwd: target.querySelector('#retypepwd').value,//this.retypepwd
    }

    console.log(newUser);

    if((newUser.first_name=="")||(newUser.last_name=="")||(newUser.email=="")||(newUser.password=="")||(newUser.retypepwd==""))
    {
      alert("All fields must be filled out");

    }
    else if(newUser.password!=newUser.retypepwd)
    {
      alert("Passwords do not match");
    }
    else
    {
      this.fs.registerUser(newUser).subscribe(user =>{
        console.log(user);
      })
      alert("Registration Successful");
    }

  }
*/






}
