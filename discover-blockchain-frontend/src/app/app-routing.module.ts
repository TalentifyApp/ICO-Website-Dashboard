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
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {TokenBuyComponent} from "./components/token-buy/token-buy.component";
import {CrowdsaleComponent} from "./components/crowdsale/crowdsale.component";
import {ReferralsComponent} from "./components/referrals/referrals.component";
import {BountiesComponent} from "./components/bounties/bounties.component";
import {MyAccountComponent} from "./components/my-account/my-account.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: SignInComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'confirm-sign-up', component: ConfirmSignUpComponent},
  //{path: 'dashboard', component: DashboardComponent/*, canActivate: [AuthGuard] */},
  {path: 'navigation', component: NavigationComponent},
  {path: 'top-bar', component: TopBarComponent},

  {
    path: '', component: BlankComponentComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'buy-token', component: TokenBuyComponent},
      {path: 'crowdsale-info', component: CrowdsaleComponent},
      {path: 'referrals', component: ReferralsComponent},
      {path: 'bounties', component: BountiesComponent},
      {path: 'my-account', component: MyAccountComponent}
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
