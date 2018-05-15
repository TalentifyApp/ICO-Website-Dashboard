import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConfig} from './config/app.config';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ConfirmSignUpComponent} from './components/confirm-sign-up/confirm-sign-up.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {BlankComponentComponent} from "./components/blank-layout/blank-layout.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: SignInComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'confirm-sign-up', component: ConfirmSignUpComponent},
  //{path: 'dashboard', component: DashboardComponent/*, canActivate: [AuthGuard] */},
  {path: 'navigation', component: NavigationComponent},

  {
    path: '', component: BlankComponentComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent}
    ]
  },
  /**
   * Otherwise redirect to 404
   */
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
