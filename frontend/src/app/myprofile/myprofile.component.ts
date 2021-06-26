import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {myuser} from '../regusers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  protected username:String;
  protected usermail:String;

  protected founduser:myuser;

  protected first_name: String;
  protected last_name: String;
  protected password:String;
  protected retypepwd:String;

  constructor(private ds:DashboardService,private router:Router) { }

  ngOnInit() {

    this.ds.currmes.subscribe(mes =>this.username=mes);
    this.ds.emailid.subscribe(mes=>this.usermail=mes);

    this.viewprofile();

  }

  viewprofile()
  {
    const curruser={
      emailid:this.usermail
    }

    this.ds.getuser(curruser).subscribe(data=>{
      this.founduser=data;

     this.first_name=this.founduser.first_name ;
     this.last_name=this.founduser.last_name ;
     this.password=this.founduser.password;
     this.retypepwd=this.founduser.retypepwd;

    });
  }

  updateprofile()
  {
    const edituser={
      emailid:this.usermail,
      fname:this.first_name,
      lname:this.last_name,
      pwd:this.password,
      retypepwd:this.retypepwd
    }

    if((this.first_name=="")||(this.last_name=="")||(this.password=="")||(this.retypepwd==""))
    {
      alert("All fields must be filled out");

    }
    else if((this.first_name==undefined)||(this.last_name==undefined)||(this.password==undefined)||(this.retypepwd==undefined))
    {
      alert("All fields must be filled out");
    }
    else if(this.password!=this.retypepwd)
    {
      alert("Passwords do not match");
    }
    else {
      this.ds.updateusr(edituser).subscribe(data=>{
        console.log(data);
      });

      this.ds.assignuser(edituser.fname);
      this.ds.currmes.subscribe(mes =>this.username=mes);
      alert("Profile details updated");
    }
  }


  deleteprofile()
  {
    var r= confirm("This will delete all the data related to your account");

    if(r==true)
    {
      this.ds.delprojects(this.usermail).subscribe(data=>{
        console.log(data);
      });

      this.ds.deluser(this.usermail).subscribe(data=>{
        console.log(data);
      });

      this.router.navigate(['']);
    }

    /*
    else
    {
      this.viewprofile();
    }
    */

  }
}
