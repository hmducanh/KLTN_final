import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SchoolService } from '../_services/school.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  code: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Trường Đại học Công nghệ, ĐHQGHN', code: "UET", address: "Xuân Thủy"},
  {position: 2, name: 'Trường đại học Kinh Tế', code: "UEB", address: "Xuân Thủy"},
  {position: 3, name: 'Đại học Kinh tế TP. Hồ Chí Minh', code: "UEH", address: "TP Hồ Chí Minh"},
  {position: 4, name: 'Đại học Bách khoa Hà Nội', code: "HUST", address: "Đống Đa"},
];

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {

  id = 4;

  constructor(private cdr: ChangeDetectorRef, private schoolService: SchoolService) {}

  displayedColumns: string[] = ['select', 'position', 'name', 'code', 'address'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<PeriodicElement>(false, []);
  selectedRow: PeriodicElement | null = null;
  
    ngOnInit() {
      if($(".add-user-a").hasClass("active-module")) {
        $(".add-user-a").removeClass("active-module");
      }
      if($(".user-a").hasClass("active-module")) {
        $(".user-a").removeClass("active-module");
      }
      if(!$(".school-a").hasClass("active-module")) {
        $(".school-a").addClass("active-module");
      }
      if($(".criteria-a").hasClass("active-module")) {
        $(".criteria-a").removeClass("active-module");
      }
      if($(".score-a").hasClass("active-module")) {
        $(".score-a").removeClass("active-module");
      }

      this.schoolService.getSchool().subscribe(data => {
        console.log(data);
        this.dataSource = data.map((item:any) => {
          return {
            position: item["id"],
            name: item["name"],
            code: item["code"],
            address: item["address"],
          };
        });
      });
    }

    add_CSGD() {
      let newRow = { position: ++this.id, name: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội', code: "HUBT", address: "Hà Nội" }; // Define your new row object
      this.dataSource = [...this.dataSource, newRow];
      this.cdr.detectChanges();
    }

    viewReport() {
      console.log(1);
    }

    vewCSGD() {
      
    }

    onRowClicked(row: PeriodicElement) {
      this.toggleSelection(row);
    }
  
    toggleSelection(row: PeriodicElement) {
      this.selection.toggle(row);
      if (this.selection.isSelected(row)) {
        this.selectedRow = row;
      } else {
        this.selectedRow = null;
      }
    }
}
