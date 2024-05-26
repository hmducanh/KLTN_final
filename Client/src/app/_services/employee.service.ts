import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'https://localhost:44362/api/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 
    
  }

  getEmployee(): Observable<any> {
    return this.http.get(AUTH_API + '');
  }

  getEmployeeByID(id: number): Observable<any> {
    return this.http.get(AUTH_API + `/${id}`);
  }

  updateEmployee(employee:any): Observable<any> {
    return this.http.put(AUTH_API, employee);
  }

  updatePassword(data:any): Observable<any> {
    return this.http.post(AUTH_API + "/updatePassword", data);
  }
}
