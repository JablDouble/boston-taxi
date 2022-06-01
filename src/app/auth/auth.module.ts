import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { CookieService } from 'ng2-cookies';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonModule } from '../common/components/button/button.module';
import { InputModule } from '../common/components/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'register', component: RegisterPageComponent },
        ],
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AuthCardComponent,
    LoadingComponent,
  ],
  exports: [RouterModule],
  providers: [CookieService],
})
export class AuthModule {}
