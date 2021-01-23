import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourSharedItemsPage } from './your-shared-items.page';

const routes: Routes = [
  {
    path: '',
    component: YourSharedItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourSharedItemsPageRoutingModule {}
