import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteComponent } from './pages/website/website.component';
// import { CreateAccontNameComponent } from './pages/create-accont-name/create-accont-name.component';
import { CreateAccountNameComponent } from './pages/create-account-name/create-account-name.component';
import { CreateAccountPasswordComponent } from './pages/create-account-password/create-account-password.component';
import { CreateAccountOtpComponent } from './pages/create-account-otp/create-account-otp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TicketHistoryComponent } from './pages/ticket-history/ticket-history.component';
import { WinnerBoardComponent } from './pages/winner-board/winner-board.component';
import { AdminPortalComponent } from './pages/admin-portal/admin-portal.component';
import { AdminPortalLoginComponent } from './pages/admin-portal-login/admin-portal-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminLotteryComponent } from './pages/admin-lottery/admin-lottery.component';
import { AdminTransactionsComponent } from './pages/admin-transactions/admin-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    // CreateAccontNameComponent,
    CreateAccountNameComponent,
    CreateAccountPasswordComponent,
    CreateAccountOtpComponent,
    DashboardComponent,
    LayoutComponent,
    TicketHistoryComponent,
    WinnerBoardComponent,
    AdminPortalComponent,
    AdminPortalLoginComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminLotteryComponent,
    AdminTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
