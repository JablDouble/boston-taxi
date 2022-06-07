import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthModule } from './modules/auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => AuthModule },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./modules/stats/stats.module').then((module) => module.StatsModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then((module) => module.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
