import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
import { ScoreService } from 'src/app/_services/score.service';

@Component({
  selector: 'app-view-detail-school-dialog',
  templateUrl: './view-detail-school-dialog.component.html',
  styleUrls: ['./view-detail-school-dialog.component.css']
})
export class ViewDetailSchoolDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDetailSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    public scoreService: ScoreService
  ) { }
  
  data_CTDT : any;

  data_CSGD : any;

  schoolResut : any;

  numberColumns: any = 4;

  ngOnInit(): void {
    const me = this;
    this.data_CSGD = this.dataService.getCriteriaCSGD();
    this.data_CTDT = this.dataService.getCriteriaCTDT();

    this.scoreService.getScoreOfSchool(this.data["position"], 0).subscribe(res => {
      if(res["data"]) {
        this.schoolResut = res["data"];
        this.schoolResut.forEach((item:any) => {
        item["result"] = item["result"].split(',');
        });

        this.numberColumns += this.schoolResut.length;
        this.data_CSGD.forEach((item:any, i:any) => {
        if(!item.isParent) {
          item["listResult"] = Array.from({ length: this.schoolResut.length });
          this.schoolResut.forEach((result:any, j:any) => {
            item["listResult"][j] = result["result"][i];
          });
          item["listResult"][i]
        }
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
