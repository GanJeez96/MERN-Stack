import { Component, OnInit } from '@angular/core';
import{oneproject} from "../myprojects";
import {DashboardService} from '../dashboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {

  protected username:String;
  protected usermail:String;

  public foundprojectid: String;
  public foundproject:oneproject;

  protected todaydate:String;

  protected prjtname:String;
  protected prjtdes:String;
  protected prjttype:String;
  protected prjtdate:String;
  protected prjtloc:String;
  protected pjtasks:String;

  constructor(private ds:DashboardService,private router:Router) {

  }

  ngOnInit() {
    this.ds.currmes.subscribe(mes =>this.username=mes);
    this.ds.emailid.subscribe(mes=>this.usermail=mes);

    this.ds.up.subscribe(data=>{
      this.foundprojectid=data;
      //this.viewfoundproject();
    });
    //console.log("displaying from editproject component,project id is : "+this.foundprojectid);

    this.viewfoundproject();

    this.dateval();
  }


  viewfoundproject()
  {


    const specific={
      objid:this.foundprojectid
    }

    this.ds.findproject(specific).subscribe(data=>{
      this.foundproject=data;
      //console.log("displaying from editproject component: ");
      //console.log(this.foundproject);
      //this.ds.project1=data;
      //console.log(this.findproject);

      //displaying the foundproject values in the html form

     this.prjtname=this.foundproject.projname;
     this.prjtdes=this.foundproject.projdes;
     this.prjttype=this.foundproject.projtype;
     this.prjtdate=this.foundproject.projdate;
     this.prjtloc=this.foundproject.projloc;
     this.pjtasks=this.foundproject.projtasks;


    });
  }

  updateproject()
  {
    const editproject={
      pjtid:this.foundprojectid,

      projname:this.prjtname,
      projdes:this.prjtdes,
      projtype:this.prjttype,
      projdate:this.prjtdate,
      projloc:this.prjtloc,
      projtasks:this.pjtasks
    }
    //console.log(editproject);

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
      this.ds.updatepjct(editproject).subscribe(data=>{
        console.log(data);
        alert("Project Updated");
      });
    }

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
