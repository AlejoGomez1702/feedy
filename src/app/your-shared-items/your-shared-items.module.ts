import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourSharedItemsPageRoutingModule } from './your-shared-items-routing.module';

import { YourSharedItemsPage } from './your-shared-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourSharedItemsPageRoutingModule
  ],
  declarations: [YourSharedItemsPage]
})
export class YourSharedItemsPageModule {}
