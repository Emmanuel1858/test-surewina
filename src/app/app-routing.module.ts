import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './pages/website/website.component';
import { CreateAccountNameComponent } from './pages/create-account-name/create-account-name.component';
import { CreateAccountPasswordComponent } from './pages/create-account-password/create-account-password.component';
import { CreateAccountOtpComponent } from './pages/create-account-otp/create-account-otp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TicketHistoryComponent } from './pages/ticket-history/ticket-history.component';
import { WinnerBoardComponent } from './pages/winner-board/winner-board.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReferralsComponent } from './pages/referrals/referrals.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
// import { CreateAccountNameComponent } from './pages/create-account-name/create-account-name.component';


const routes: Routes = [
  { path: 'Jollywina.com', component: WebsiteComponent },
  { path: 'create-account-name', component: CreateAccountNameComponent },
  { path: 'create-account-password', component: CreateAccountPasswordComponent },
  { path: 'create-account-otp', component: CreateAccountOtpComponent },

  { path: '', redirectTo: 'Jollywina.com', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ticket-history', component: TicketHistoryComponent },
      { path: 'winner-board', component: WinnerBoardComponent }
    ]
  },
  { path: 'my-profile', component: MyProfileComponent}
  // {
  //   path: '', component: LayoutComponent,
  //   children: [
  //     { path: 'profile-details', component: ProfileDetailsComponent },
  //     { path: 'settings', component: SettingsComponent },
  //     { path: 'referrals', component: ReferralsComponent }
  //   ]
  // }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

