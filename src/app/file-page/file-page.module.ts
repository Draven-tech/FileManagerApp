import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilePagePageRoutingModule } from './file-page-routing.module';
import { FilePagePage } from './file-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilePagePageRoutingModule,
    FilePagePage
  ],
})
export class FilePagePageModule {}
