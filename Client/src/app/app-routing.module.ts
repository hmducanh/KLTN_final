import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { UserComponent } from './user/user.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { SchoolComponent } from './school/school.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'criteria', component: CriteriaComponent, canActivate: [AuthGuard] },
  { path: 'school', component: SchoolComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'score', component: ScoreComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
