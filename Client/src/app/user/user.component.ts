import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatDialog } from '@angular/material/dialog'; 
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  afterSubmit = false;

  isView = true;

  name: string = "";

  age: number = 0;

  address: string = "";

  email: string = "";

  role: string = "";

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private tokenStorage: TokenStorageService, private employeeService:EmployeeService) {
    
  }
  
  profileForm = this.formBuilder.group({
    name: ["", Validators.required],
    age: [],
    email: ["", [Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
    address: []
  });

  changView(CheckIsView: boolean) {
    this.isView = CheckIsView;
  }

  ngOnInit() {
    if($(".add-user-a").hasClass("active-module")) {
      $(".add-user-a").removeClass("active-module");
    }
    if(!$(".user-a").hasClass("active-module")) {
      $(".user-a").addClass("active-module");
    }
    if($(".school-a").hasClass("active-module")) {
      $(".school-a").removeClass("active-module");
    }
    if($(".criteria-a").hasClass("active-module")) {
      $(".criteria-a").removeClass("active-module");
    }
    if($(".score-a").hasClass("active-module")) {
      $(".score-a").removeClass("active-module");
    }

    this.employeeService.getEmployeeByID(this.tokenStorage.getUser()).subscribe(
      res => {
        this.name = res["fullName"];
        this.age = res["age"];
        this.email = res["email"];
        this.address = res["address"];
        let _role = res["role"];

        if(_role == 0) {
          this.role = "Admin";
        } 
        else if(_role == 1) {
          this.role = "Tổ chức Kiểm định chất lượng cơ sở giáo dục";
        }
        else {
          this.role = "Chuyên gia";
        }
      }
    );
  }

  changePassword() {
    let dialogRef = this.dialog.open(ChangePasswordDialogComponent, { 
      width: '350px', 
      height: '448px',
      maxHeight: '448px'
    }); 
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if(!(this.profileForm.controls["name"].errors && this.profileForm.controls["name"].errors["required"]) &&
       !(this.profileForm.controls["email"].errors && this.profileForm.controls["email"].errors["required"]) &&
       !(this.profileForm.controls["email"].touched && this.profileForm.controls["email"].invalid)
    )
    {
      // console.log("gui request");
      this.employeeService.updateEmployee({
        "ID": this.tokenStorage.getUser(),
        "FullName": this.name,
        "Age": this.age,
        "Email": this.email,
        "Address": this.address
      }).subscribe();
      this.changView(true);
    }
    this.afterSubmit = true;
  }
}
