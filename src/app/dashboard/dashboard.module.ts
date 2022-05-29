import { CommonModule } from "@angular/common";
import { NgModule, Provider } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CardComponent } from './components/card/card.component';
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";
import { MapComponent } from './components/map/map.component';
import { MapService } from "./services/map.service";
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { PaymentManageComponent } from './components/payment-manage/payment-manage.component';
import { PaymentSelectComponent } from './components/payment-select/payment-select.component';
import { PaymentService } from "./services/payment.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../auth/interceptors/auth.interceptor";
import { TripService } from "./services/trip.service";
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AddressInputModule } from "../common/components/address-input/address-input.module";
import { ButtonModule } from "../common/components/button/button.module";
import { DataRecordModule } from "../common/components/data-record/data-record.module";
import { InputModule } from "../common/components/input/input.module";
import { TableModule } from "../common/components/table/table.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardLayoutComponent } from "./components/dashboard-layout/dashboard-layout.component";
import { AuthGuard } from "../auth/services/auth.guard";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeaderComponent } from "./components/header/header.component";

const AUTH_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: DashboardLayoutComponent, children: [
                    { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
                    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
                    { path: 'stats', component: StatsPageComponent, canActivate: [AuthGuard] },
                    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] }
                ]
            }
        ]),
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_MAPS_API_KEY,
            libraries: ['places']
        }),
        CommonModule,
        ReactiveFormsModule,
        AddressInputModule,
        ButtonModule,
        DataRecordModule,
        InputModule,
        TableModule
    ],
    declarations: [
        HomePageComponent,
        StatsPageComponent,
        ProfilePageComponent,
        CardComponent,
        MapComponent,
        DriverInfoComponent,
        PaymentManageComponent,
        PaymentSelectComponent,
        AccountInfoComponent,
        DashboardLayoutComponent,
        HeaderComponent,
        NavbarComponent
    ],
    exports: [RouterModule],
    providers: [
        MapService,
        PaymentService,
        TripService,
        AUTH_INTERCEPTOR_PROVIDER
    ]
})
export class DashboardModule {

}