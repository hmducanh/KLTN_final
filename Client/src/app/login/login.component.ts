import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { EmployeeService } from '../_services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router
    , private EmployeeService: EmployeeService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    const me = this;

    this.authService.login(username, password).subscribe(
      res => {
        if(res["success"] == true && res["data"]) {
          let data = res["data"];
          let id = res["message"];
          let role = res["role"];
          if(isNaN(id)) {
            id = 0;
          }
          else {
            id = Number(id);
          }
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveRefreshToken(data.refreshToken);
          this.tokenStorage.saveUser(id);
          this.tokenStorage.saveRoleUser(role);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigateByUrl('criteria');
          setTimeout(() => {
            this.reloadPage();
          }, 0.5);
        }
        else {
          me.errorMessage = "Tài khoản hoặc mật khẩu chưa đúng";
          me.isLoginFailed = true;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
