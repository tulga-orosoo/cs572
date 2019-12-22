import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http:HttpClient) { }
  loading = true;
  cache = {};

  getOnlineData():Observable<any> {
    let data:any = null;

    if(localStorage.getItem('userData')) {
      data = localStorage.getItem('userData');
    } else {
      // if() {}
      // this.http.get('https://randomuser.me/api/?results=10')
      //   .subscribe(res => )
    }
    console.log(data);
    return data;
  }


}
