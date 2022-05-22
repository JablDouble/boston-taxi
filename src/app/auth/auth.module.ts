import { NgModule, Provider } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { CookieService } from "ng2-cookies";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "../shared/interceptors/loader-interceptors.service";
import { LoadingComponent } from './components/loading/loading.component';

const LOADER_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: LoaderInterceptor
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'register', component: RegisterPageComponent }
        ]
      }
    ]),
    SharedModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AuthCardComponent,
    LoadingComponent
  ],
  exports: [RouterModule],
  providers: [

    CookieService,
    LOADER_INTERCEPTOR_PROVIDER
  ]
})
export class AuthModule {

}