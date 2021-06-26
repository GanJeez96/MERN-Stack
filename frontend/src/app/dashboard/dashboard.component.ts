import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   protected username:String;
   protected usermail:String;

   private projectID;
   protected todaydate:String;

   private prjctno: Number;
   protected prjtname:String;
   protected prjtdes:String;
   protected prjttype:String;
   protected prjtdate:String;
   protected prjtloc:String;
   protected pjtasks:String;



  constructor(private ds:DashboardService) {

  }

  ngOnInit() {
    this.ds.currmes.subscribe(mes =>this.username=mes);
    this.ds.emailid.subscribe(mes=>this.usermail=mes);
    this.countproj();

    this.dateval();


    //console.log(this.usermail);
  }




  addProject()
  {


    const newproject={
      projectid: this.prjctno,
      projmngr:this.usermail,

      projname:this.prjtname,
      projdes:this.prjtdes,
      projtype:this.prjttype,
      projdate:this.prjtdate,
      projloc:this.prjtloc,
      projtasks:this.pjtasks


    }

    if((this.prjtname=="")||(this.prjtdes=="")||(this.prjttype=="")||(this.prjtdate=="")||(this.prjtloc==""))
    {
      alert("All fields must be filled out");

    }
    else if((this.prjtname==undefined)||(this.prjtdes==undefined)||(this.prjttype==undefined)||(this.prjtdate==undefined)||(this.prjtloc==undefined))
    {
      alert("All fields must be filled out");
    }
    else if((this.pjtasks=="")||(this.pjtasks==undefined))
    {
      alert("Project tasks has not been set");
    }
    else
    {
      this.ds.newProject(newproject).subscribe(proj =>{
      //console.log(proj);
        this.countproj();
      });
      alert("New project Created");
      this.prjtname="";
      this.prjtdes="";
      this.prjttype="";
      this.prjtdate="";
      this.prjtloc="";
      this.pjtasks="";

      //this.prjctno=this.projectID+1;

    }

  }

  countproj()
  {
    this.ds.getProjectsno().subscribe(data=>{this.projectID=data

      //console.log("Last record id in DB: "+this.projectID);
      this.prjctno=this.projectID+1;
      //console.log("Current project ID: "+this.prjctno);

    });



  }

  dateval()
  {
    var cd=new Date();
    var d= cd.getDate();
    var m= cd.getMonth()+1;
    var y=cd.getFullYear();
    //var fd=y+"-"+m+"-"+d;
    var dd,mm;
    //if(d<10){
      //dd='0'+d
    //}
    if(m<10){
      mm='0'+m
    }
    var fd=y+"-"+mm+"-"+d;
    console.log(fd);

    this.todaydate=fd;

  }



}
