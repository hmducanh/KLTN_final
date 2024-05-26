import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role:2
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles = [
    {
      id: 0,
      name: "Admin"
    }, 
    {
      id: 1,
      name: "Tổ chức kiểm định chất lượng CSGD"
    }, 
    {
      id: 2,
      name: "Chuyên gia"
    }];

  constructor(private authService: AuthService, private toastService: NgToastService) { }

  ngOnInit(): void {
    if(!$(".add-user-a").hasClass("active-module")) {
      $(".add-user-a").addClass("active-module");
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
    if($(".score-a").hasClass("active-module")) {
      $(".score-a").removeClass("active-module");
    }
  }

  onSubmit(): void {
    const { username, email, password, role } = this.form;
    this.authService.register(username, email, password, role).subscribe(
      data => {
        console.log(data);

        if(data["success"]) {
          this.toastService.success({
            detail: "Success !",
            summary: "Bạn đã tạo tài khoản thành công",
            duration: 5000
          });
          
        }
        else {
          this.toastService.error({
            detail: "Error !",
            summary: data["message"],
            duration: 5000
          });
        }
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}