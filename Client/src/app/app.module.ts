


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthGuard } from './_services/auth.guard';
import { CriteriaComponent } from './criteria/criteria.component';
import { SchoolComponent } from './school/school.component';
import { UserComponent } from './user/user.component';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './user/change-password-dialog/change-password-dialog.component';
import { AddCriteriaDialogComponent } from './criteria/add-criteria-dialog/add-criteria-dialog.component';
import { ViewCriteriaDialogComponent } from './criteria/view-criteria-dialog/view-criteria-dialog.component';
import { ScoreComponent } from './score/score.component';
import { ScroingDialogComponent } from './score/scroing-dialog/scroing-dialog.component';
import { ViewDetailSchoolDialogComponent } from './school/view-detail-school-dialog/view-detail-school-dialog.component';
import { CriteriaPerSchoolComponent } from './school/view-detail-school-dialog/criteria-per-school/criteria-per-school.component';
import { ExpertScoreComponent } from './school/view-detail-school-dialog/expert-score/expert-score.component';
import { MaterialModule } from './material-modules';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CriteriaComponent,
    SchoolComponent,
    UserComponent,
    ChangePasswordDialogComponent,
    AddCriteriaDialogComponent,
    ViewCriteriaDialogComponent,
    ScoreComponent,
    ScroingDialogComponent,
    ViewDetailSchoolDialogComponent,
    CriteriaPerSchoolComponent,
    ExpertScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
