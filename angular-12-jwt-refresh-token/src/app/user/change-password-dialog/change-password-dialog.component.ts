import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../_services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  oldPassword: string = "";

  newPassword: string = "";

  reNewPassword: string = "";

  afterSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private employeeService: EmployeeService, 
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>) { }

  passwordForm = this.formBuilder.group({
    oldpassword: ["", Validators.required],
    newPassword: ["", Validators.required],
    reNewPassword: ["", Validators.required],
  });

  ngOnInit(): void {
  }

  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.afterSubmit = true;
    if(!(this.passwordForm.controls["oldpassword"].errors && this.passwordForm.controls["oldpassword"].errors["required"]) &&
    !(this.passwordForm.controls["newPassword"].errors && this.passwordForm.controls["newPassword"].errors["required"]) &&
    !(this.passwordForm.controls["reNewPassword"].errors && this.passwordForm.controls["reNewPassword"].errors["required"])
    ) {
      if(this.newPassword == this.reNewPassword) {
        this.employeeService.updatePassword({
          newPass: this.newPassword,
          oldPass: this.oldPassword
        }).subscribe(res => {
          if(res && res["success"]) {
            this.toastService.success({
              detail: "Success !",
              summary: res["message"],
              duration: 5000
            });
            this.closePopup();
          }
          else {
            this.toastService.error({
              detail: "Error !",
              summary: res["message"],
              duration: 5000
            });
          }
        });
      }
      else {
        this.toastService.error({
          detail: "Error !",
          summary: "Hai mật khẩu mới không trùng nhau",
          duration: 5000
        });
      }
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
}
