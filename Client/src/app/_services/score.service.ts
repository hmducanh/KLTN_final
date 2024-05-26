import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44362/api/Score';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 
    
  }

  getScore(schoolID:number, typeReport:number): Observable<any> {
    let user = this.tokenStorageService.getUser();
    return this.http.get(AUTH_API + `/${user}/${schoolID}/${typeReport}`);
  }

  getScoreOfSchool(schoolID:number, typeReport:number): Observable<any> {
    return this.http.get(AUTH_API + `/${schoolID}/${typeReport}`);
  }

  saveScore(EducationalFacilityID:number, CriterionMappingID:number, Result:string): Observable<any> {
    let EmployeeID = this.tokenStorageService.getUser();
    let IsActive = true;
    return this.http.post(AUTH_API + ``, {
      EmployeeID,
      EducationalFacilityID, 
      CriterionMappingID,
      Result
    }, httpOptions);
  }
}
