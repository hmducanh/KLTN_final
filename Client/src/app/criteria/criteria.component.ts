import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as $ from "jquery";
import { CriteriaService } from '../_services/criteria.service';
import { CriterionMapping } from '../_model/Criterion';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})

export class CriteriaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['criteria', 'requirement', 'benchmark', 'evidence'];
  
  data_CTDT : any;

  data_CSGD : any;
  
  dataSource : any; 

  total: number = 0;

  selection = new SelectionModel<CriterionMapping>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public criteriaService: CriteriaService, public dataService: DataService) {
  }

  ngOnInit() {
    if($(".add-user-a").hasClass("active-module")) {
      $(".add-user-a").removeClass("active-module");
    }
    if($(".user-a").hasClass("active-module")) {
      $(".user-a").removeClass("active-module");
    }
    if($(".school-a").hasClass("active-module")) {
      $(".school-a").removeClass("active-module");
    }
    if(!$(".criteria-a").hasClass("active-module")) {
      $(".criteria-a").addClass("active-module");
    }
    if($(".score-a").hasClass("active-module")) {
      $(".score-a").removeClass("active-module");
    }

    this.data_CSGD = this.dataService.getCriteriaCSGD();

    this.data_CTDT = this.dataService.getCriteriaCTDT();

    // this.criteriaService.getCriteriaMapping().subscribe(res => {
    //   this.dataSource = new MatTableDataSource<CriterionMapping>(res["data"]);
    //   this.data = res["data"];
    //   this.total = this.data.length;
    // });

    
    $(".table-CTDT").hide();
  }

  ngAfterViewInit() {
    console.log(this.dataSource);
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach((item:any) => this.selection.select(item));
  // }

  // addRow() {

  // }

  // removeRow() {
  //   this.selection.selected.forEach((item) => {
  //     let index: number = this.data.findIndex((d:any) => d === item);
  //     console.log(this.data.findIndex((d:any) => d === item));
  //     this.dataSource.data.splice(index, 1);

  //     this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
  //   });
  //   this.selection = new SelectionModel<CriterionMapping>(true, []);
  // }

  switchCTDT() {
    $(".table-CTDT").show();
    $(".table-CSGD").hide();
  }

  switchCSGD() {
    $(".table-CTDT").hide();
    $(".table-CSGD").show();
  }
}
