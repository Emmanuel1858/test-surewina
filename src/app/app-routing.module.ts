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
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminPortalLoginComponent } from './pages/admin-portal-login/admin-portal-login.component';
import { AdminPortalComponent } from './pages/admin-portal/admin-portal.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminLotteryComponent } from './pages/admin-lottery/admin-lottery.component';
import { AdminTransactionsComponent } from './pages/admin-transactions/admin-transactions.component';
import { VendorLoginComponent } from './pages/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
import { VendorCreateAccountNameComponent } from './pages/vendor-create-account-name/vendor-create-account-name.component';
import { VendorCreateAccountPasswordComponent } from './pages/vendor-create-account-password/vendor-create-account-password.component';
import { VendorCreateAccountOtpComponent } from './pages/vendor-create-account-otp/vendor-create-account-otp.component';
import { VendorWinnerBoardComponent } from './pages/vendor-winner-board/vendor-winner-board.component';
import { VendorTicketHistoryComponent } from './pages/vendor-ticket-history/vendor-ticket-history.component';
import { VendorSellTicketComponent } from './pages/vendor-sell-ticket/vendor-sell-ticket.component';
import { VendorMakePaymentComponent } from './pages/vendor-make-payment/vendor-make-payment.component';
import { SelectProfileComponent } from './pages/select-profile/select-profile.component';
import { VendorProfileComponent } from './pages/vendor-profile/vendor-profile.component';
import { AddTicketComponent } from './pages/add-ticket/add-ticket.component';
import { ScheduleDrawComponent } from './pages/schedule-draw/schedule-draw.component';
import { AddPrizeComponent } from './pages/add-prize/add-prize.component';
import { ConfigureTierComponent } from './pages/configure-tier/configure-tier.component';
import { ConfigureWinningsComponent } from './pages/configure-winnings/configure-winnings.component';
import { AddPrizeDepotComponent } from './pages/add-prize-depot/add-prize-depot.component';
import { TestingComponent } from './pages/testing/testing.component';
import { AdminInitiateComponent } from './pages/admin-initiate/admin-initiate.component';
// import { CreateAccountNameComponent } from './pages/create-account-name/create-account-name.component';


const routes: Routes = [
  { path: 'Surewina.com', component: WebsiteComponent },
  { path: 'select-your-profile', component: SelectProfileComponent },
  { path: 'create-account-name', component: CreateAccountNameComponent },
  { path: 'create-account-password', component: CreateAccountPasswordComponent },
  { path: 'create-account-otp', component: CreateAccountOtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-details', component: ProfileDetailsComponent },


  { path: '', redirectTo: 'Surewina.com', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ticket-history', component: TicketHistoryComponent },
      { path: 'winner-board', component: WinnerBoardComponent }
    ]
  },

  { path: 'vendor-create-account-name', component: VendorCreateAccountNameComponent },
  { path: 'vendor-create-account-password', component: VendorCreateAccountPasswordComponent },
  { path: 'vendor-create-account-otp', component: VendorCreateAccountOtpComponent },
  { path: 'vendor-login', component: VendorLoginComponent },
  { path: 'vendor-dashboard', component: VendorDashboardComponent },
  { path: 'vendor-winner-board', component: VendorWinnerBoardComponent },
  { path: 'vendor-ticket-history', component: VendorTicketHistoryComponent },
  { path: 'vendor-sell-ticket', component: VendorSellTicketComponent },
  { path: 'vendor-make-payment', component: VendorMakePaymentComponent },
  { path: 'vendor-profile', component: VendorProfileComponent },
  { path: 'admin-login', component: AdminPortalLoginComponent },
  { path: 'initiate', component: AdminInitiateComponent},
  {
    path: '', component: AdminPortalComponent,
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'lottery-add-ticket', component: AddTicketComponent },
      { path: 'schedule-draw', component: ScheduleDrawComponent },
      { path: 'add-prize', component: AddPrizeComponent },
      { path: 'add-prize-depot', component: AddPrizeDepotComponent},
      { path: 'lottery', component: AdminLotteryComponent },
      { path: 'configure-tier', component: ConfigureTierComponent },
      { path: 'configure-winning', component: ConfigureWinningsComponent},
      { path: 'transactions', component: AdminTransactionsComponent },
    ]
  },
  { path: 'test', component: TestingComponent}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
