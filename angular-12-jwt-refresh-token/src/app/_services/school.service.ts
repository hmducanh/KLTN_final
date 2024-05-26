import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44362/api/EducationalFacility';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 
    
  }

  getSchool(): Observable<any> {
    return this.http.get(AUTH_API + '');
  }
}
