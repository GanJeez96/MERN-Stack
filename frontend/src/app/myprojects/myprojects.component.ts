import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {Router} from '@angular/router';

import{userprojects} from "../myprojects";
import{oneproject} from "../myprojects";
import {BehaviorSubject} from "rxjs/index";

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {

  protected username:String;
  protected usermail:String;

  public allprojects:userprojects[];
  public findproject: oneproject;

  constructor(private ds:DashboardService,private router:Router) { }

  ngOnInit() {

    this.ds.currmes.subscribe(mes =>this.username=mes);
    this.ds.emailid.subscribe(mes=>this.usermail=mes);

    this.viewusrprojects();


  }

  deleteproject(projid)
  {
    var r= confirm("By deleting you will lose all the data related to this project");

    if(r==true)
    {
      this.ds.deleteproject(projid).subscribe(data =>{
        //console.log(data);
        this.viewusrprojects();
      });
    }
    else{
      this.viewusrprojects();
    }



  }

  viewusrprojects()
  {
    const projuser={
      emailid:this.usermail
    }

    this.ds.getprojects(projuser).subscribe(data =>{
      this.allprojects=data;
      //console.log(this.allprojects);
    });
  }

  findoneproject(projobjid:String)
  {
    this.ds.setproject(projobjid);
    this.router.navigate(['editproject']);

    /*
    const specific={
      objid:projobjid
    }

    this.ds.findproject(specific).subscribe(data=>{
      this.findproject=data;
      //this.ds.project1=data;
      console.log(this.findproject);
    });
    */

    //this.router.navigate(['editproject']);

  }

}
