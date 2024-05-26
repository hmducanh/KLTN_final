import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../_services/data.service';
import { ScoreService } from '../../_services/score.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-scroing-dialog',
  templateUrl: './scroing-dialog.component.html',
  styleUrls: ['./scroing-dialog.component.css']
})
export class ScroingDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScroingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    public scoreService: ScoreService,
    public toastService: NgToastService
  ) { }

  data_CTDT : any;

  data_CSGD : any;

  dataScore: number[] = [];

  ngOnInit(): void {
    this.data_CSGD = this.dataService.getCriteriaCSGD();
    this.data_CTDT = this.dataService.getCriteriaCTDT();
    this.scoreService.getScore(this.data["id"], 0).subscribe(res => {
      if(!res["data"]) {
        this.dataScore = Array.from({ length: 16 });
      }
      else {
        this.dataScore = res.data.split(',');
      }
    });
  }

  saveScore() {
    const me = this;
    this.scoreService.saveScore(this.data["id"], 0, this.dataScore.toString()).subscribe(res => {
      me.dialogRef.close();
      this.toastService.success({
        detail: "Success !",
        summary: "Bạn đã chấm điểm thành công",
        duration: 5000
      });
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
