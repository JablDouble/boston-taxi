import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

@NgModule({
  declarations: [StatsPageComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: StatsPageComponent, canActivate: [AuthGuard] }]),
    CommonModule,
    CardModule,
    TableModule,
  ],
  exports: [RouterModule],
})
export class StatsModule {}
