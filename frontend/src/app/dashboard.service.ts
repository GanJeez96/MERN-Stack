import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {Observable, of,throwError} from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import{oneproject} from "./myprojects";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private ms = new BehaviorSubject<String>("");
  currmes=this.ms.asObservable();

  private eid = new BehaviorSubject<String>("");
  emailid=this.eid.asObservable();

  public project1: oneproject;
  private usp = new BehaviorSubject<String>("");
  up=this.usp.asObservable();


  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  //creating new project
  newProject(project):Observable<any>{
    return this.http.post('http://localhost:8888/project',project,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //getting the last project's id no
  getProjectsno()
  {
    return this.http.get('http://localhost:8888/lastprjct').pipe(catchError(this.handleError));
  }

  //assigning the user's firstname accessible to all dashboard related funtions.
  assignuser(user:String)
  {
    this.ms.next(user);
  }

  //assigning the user's email id accessible to all dashboard related functions
  setEmail(usermail:String)
  {
    this.eid.next(usermail);
  }

  //assigning the project id accessible to all dashboard related functions.
  setproject(pjctid:String)
  {

    this.usp.next(pjctid);
    //console.log("displaying from dashboard.service.ts"+this.project1);
  }

  //getting user's projects
  getprojects(emailid):Observable<any>{
    return this.http.post('http://localhost:8888/projects',emailid,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //deleting a project
  deleteproject(projid):Observable<any>{
    return this.http.delete('http://localhost:8888/delproject/'+projid)
      .pipe(catchError(this.handleError));
  }

  //getting a particular project
  findproject(objid):Observable<any>{
    return this.http.post('http://localhost:8888/findproject',objid,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //updating a particular project
  updatepjct(project):Observable<any>{
    return this.http.put('http://localhost:8888/updateproj',project,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //deleting multiple projects
  delprojects(usrmail):Observable<any>{
    return this.http.delete('http://localhost:8888/delprojects/'+usrmail)
      .pipe(catchError(this.handleError));
  }


  //User profile methods

  //finding a particular user
  getuser(user):Observable<any>{
    return this.http.post('http://localhost:8888/finduser',user,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //updating a particular user
  updateusr(user):Observable<any>{
    return this.http.put('http://localhost:8888/editprofile',user,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //deleting a particular user
  deluser(usrmail):Observable<any>{
    return this.http.delete('http://localhost:8888/user/'+usrmail)
      .pipe(catchError(this.handleError));
  }

}
