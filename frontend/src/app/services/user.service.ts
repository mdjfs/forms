import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { storageKeys as authKeys } from './auth.service';


export interface UserData{
  id: number,
  username: string,
  role: string,
  createdAt?:string,
  updatedAt?:string,
}




@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url: string = undefined;
  headers: HttpHeaders = undefined;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_url;
    this.headers = new HttpHeaders({'Content-Type': 'application/json', [authKeys.auth]: localStorage.getItem(authKeys.auth)});
  }

  getData(): Observable<UserData>{
    const request =  this.http.get<UserData>(`${this.api_url}/user`,  { headers: this.headers }).pipe(share());
    return request;
  }

  getAll(): Observable<JSON[]>{
    const request =  this.http.get<JSON[]>(`${this.api_url}/user/all`,  { headers: this.headers }).pipe(share());
    return request;
  }

  logout(){
    localStorage.removeItem(authKeys.auth);
    window.location.reload();
  }
}