import { CommonModule } from "@angular/common";
import { NgModule, Provider } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardLayoutComponent } from "./shared/components/dashboard-layout/dashboard-layout.component";
import { StatsPageComponent } from './stats-page/stats-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CardComponent } from './components/card/card.component';
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";
import { MapComponent } from './components/map/map.component';
import { SharedModule } from "../shared/shared.module";
import { MapService } from "./shared/services/map.service";
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { PaymentManageComponent } from './components/payment-manage/payment-manage.component';
import { PaymentSelectComponent } from './components/payment-select/payment-select.component';
import { PaymentService } from "./shared/services/payment.service";
import { AuthGuard } from "../auth/shared/services/auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../auth/shared/interceptors/auth.interceptor";
import { TripService } from "./shared/services/trip.service";
import { AccountInfoComponent } from './components/account-info/account-info.component';

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
        SharedModule,
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
        AccountInfoComponent
    ],
    exports: [RouterModule],
    providers: [
        MapService,
        PaymentService,
        AuthGuard,
        TripService,
        AUTH_INTERCEPTOR_PROVIDER
    ]
})
export class DashboardModule {

}