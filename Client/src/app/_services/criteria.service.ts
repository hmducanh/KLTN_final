import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44362/api/Criterion';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 
    
  }

  getCriteriaMapping(): Observable<any> {
    return this.http.get(AUTH_API + '');
  }
}
