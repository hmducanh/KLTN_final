import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../_services/school.service';
import { MatDialog } from '@angular/material/dialog';
import { ScroingDialogComponent } from './scroing-dialog/scroing-dialog.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(
    private schoolService: SchoolService,
    private dialog: MatDialog
  ) { }

  schools: any;

  ngOnInit(): void {
    if($(".add-user-a").hasClass("active-module")) {
      $(".add-user-a").removeClass("active-module");
    }
    if($(".user-a").hasClass("active-module")) {
      $(".user-a").removeClass("active-module");
    }
    if($(".school-a").hasClass("active-module")) {
      $(".school-a").removeClass("active-module");
    }
    if($(".criteria-a").hasClass("active-module")) {
      $(".criteria-a").removeClass("active-module");
    }
    if(!$(".score-a").hasClass("active-module")) {
      $(".score-a").addClass("active-module");
    }

    this.schoolService.getSchool().subscribe(data => {
      data.forEach((e: any, index : any) => {
        e["view"] = index;
      });
      this.schools = data;
    });
  }

  openPopupScore(school: any) {
    this.dialog.open(ScroingDialogComponent, {
      width: '2000px',
      height: '800px',
      data: school
    });
  }

}
