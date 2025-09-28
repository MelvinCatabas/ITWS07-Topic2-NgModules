import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';   // ✅ standalone page

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    AboutPage   // ✅ import standalone page here
  ]
})
export class AboutPageModule {}
