import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProfilePageRoutingModule } from './update-profile-routing.module';

import { UpdateProfilePage } from './update-profile.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProfilePageRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [UpdateProfilePage]
})
export class UpdateProfilePageModule {}
