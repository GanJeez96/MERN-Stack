import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {newusers} from './regusers';

@Injectable({
  providedIn: 'root'
})
export class FrontendserviceService {

  authToken:any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8888/user',user,{headers: headers})
      .pipe(map(res => res.json()));

  }

}
