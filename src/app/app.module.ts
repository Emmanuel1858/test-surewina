import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
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
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReferralsComponent } from './pages/referrals/referrals.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component'
import { AdminPortalLoginComponent } from './pages/admin-portal-login/admin-portal-login.component';
import { AdminPortalComponent } from './pages/admin-portal/admin-portal.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminLotteryComponent } from './pages/admin-lottery/admin-lottery.component';
import { AdminTransactionsComponent } from './pages/admin-transactions/admin-transactions.component';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import { VendorLoginComponent } from './pages/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     WebsiteComponent,
//     // CreateAccontNameComponent,
//     CreateAccountNameComponent,
//     CreateAccountPasswordComponent,
//     CreateAccountOtpComponent,
//     DashboardComponent,
//     LayoutComponent,
//     TicketHistoryComponent,
//     WinnerBoardComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })

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
    ProfileDetailsComponent,
    SettingsComponent,
    ReferralsComponent,
    MyProfileComponent,
    LoaderComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    AdminPortalLoginComponent,
    AdminPortalComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminLotteryComponent,
    AdminTransactionsComponent,
    AdminSideNavComponent,
    VendorLoginComponent,
    VendorDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule
    // MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
