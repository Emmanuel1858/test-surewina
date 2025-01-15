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
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReferralsComponent } from './pages/referrals/referrals.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

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
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
