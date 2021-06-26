import { Injectable } from '@angular/core';

/*
The code below is a combination of the code which was referenced from "https://www.djamware.com/post/5b00bb9180aca726dee1fd6d/mean-stack-angular-6-crud-web-application"
site and some youtube video tutorials
 */

import {Observable, of,throwError} from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserregService {

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


  //user registration
  registerUser(user):Observable<any>{
    return this.http.post('http://localhost:8888/user',user,httpOptions)
      .pipe(catchError(this.handleError));
  }

  //user login
  loginuser(user):Observable<any>{
    return this.http.post('http://localhost:8888/login',user,httpOptions)
      .pipe(catchError(this.handleError));
  }

}
