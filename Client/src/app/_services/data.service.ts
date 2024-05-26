import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public criteriaCSGD: any = null;

  public criteriaCTDT: any = null;

  setCriteriaCSGD(data: any) {
    this.criteriaCSGD = data;
  }

  getCriteriaCSGD(): any {
    return this.criteriaCSGD;
  }

  setCriteriaCTDT(data: any) {
    this.criteriaCTDT = data;
  }

  getCriteriaCTDT(): any {
    return this.criteriaCTDT;
  }
}
