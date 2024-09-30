import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{

  private apiUrl='http://localhost:3000/auth';

    constructor(private http:HttpClient){}
    
    login(data:any):Observable<any> 
    {
        return this.http.post(`https://sampleapi.free.beeceptor.com`,data);
    }

    signup(data:any):Observable<any> 
    {
       return this.http.post(`${this.apiUrl}/signup`,data);
    }
}
