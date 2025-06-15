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
import { VendorCreateAccountNameComponent } from './pages/vendor-create-account-name/vendor-create-account-name.component';
import { VendorCreateAccountPasswordComponent } from './pages/vendor-create-account-password/vendor-create-account-password.component';
import { VendorCreateAccountOtpComponent } from './pages/vendor-create-account-otp/vendor-create-account-otp.component';
import { LayoutVendorComponent } from './components/layout-vendor/layout-vendor.component';
import { VendorWinnerBoardComponent } from './pages/vendor-winner-board/vendor-winner-board.component';
import { VendorTicketHistoryComponent } from './pages/vendor-ticket-history/vendor-ticket-history.component';
import { VendorSellTicketComponent } from './pages/vendor-sell-ticket/vendor-sell-ticket.component';
import { VendorMakePaymentComponent } from './pages/vendor-make-payment/vendor-make-payment.component';
// import { VenorProfileComponent } from './pages/venor-profile/venor-profile.component';
import { VendorProfileComponent } from './pages/vendor-profile/vendor-profile.component';
import { SelectProfileComponent } from './pages/select-profile/select-profile.component';
import { VendorHeaderComponent } from './components/vendor-header/vendor-header.component';
import { AddTicketComponent } from './pages/add-ticket/add-ticket.component';
import { TicketAvailableComponent } from './pages/ticket-available/ticket-available.component';
import { ScheduleDrawComponent } from './pages/schedule-draw/schedule-draw.component';
import { AddPrizeComponent } from './pages/add-prize/add-prize.component';
import { AddPrizeDepotComponent } from './pages/add-prize-depot/add-prize-depot.component';
import { ConfigureTierComponent } from './pages/configure-tier/configure-tier.component';
import { ConfigureWinningsComponent } from './pages/configure-winnings/configure-winnings.component';
import { TestingComponent } from './pages/testing/testing.component';
import { AdminInitiateComponent } from './pages/admin-initiate/admin-initiate.component';
import { LoaderAdminComponent } from './components/loader-admin/loader-admin.component';
import { WinnerBoardWebsiteComponent } from './pages/winner-board-website/winner-board-website.component';
import { CreateAccountAdminComponent } from './pages/create-account-admin/create-account-admin.component';
import { AddAdminUserComponent } from './pages/add-admin-user/add-admin-user.component';
import { SkeletonLineLoaderComponent } from './components/skeleton-line-loader/skeleton-line-loader.component';
import { SkeletonBoxLoaderComponent } from './components/skeleton-box-loader/skeleton-box-loader.component';

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
    VendorDashboardComponent,
    VendorCreateAccountNameComponent,
    VendorCreateAccountPasswordComponent,
    VendorCreateAccountOtpComponent,
    LayoutVendorComponent,
    VendorWinnerBoardComponent,
    VendorTicketHistoryComponent,
    VendorSellTicketComponent,
    VendorMakePaymentComponent,
    // VenorProfileComponent,
    VendorProfileComponent,
    SelectProfileComponent,
    VendorHeaderComponent,
    AddTicketComponent,
    TicketAvailableComponent,
    ScheduleDrawComponent,
    AddPrizeComponent,
    AddPrizeDepotComponent,
    ConfigureTierComponent,
    ConfigureWinningsComponent,
    TestingComponent,
    AdminInitiateComponent,
    LoaderAdminComponent,
    WinnerBoardWebsiteComponent,
    CreateAccountAdminComponent,
    AddAdminUserComponent,
    SkeletonLineLoaderComponent,
    SkeletonBoxLoaderComponent

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
