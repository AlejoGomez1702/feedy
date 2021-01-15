import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AboutUsPage } from './about-us.page';

const routes: Routes = [
  {
    path: '',
    component: AboutUsPage,
    canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsPageRoutingModule {}
