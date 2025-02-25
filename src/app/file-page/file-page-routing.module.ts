import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilePagePage } from './file-page.page';

const routes: Routes = [
  {
    path: '',
    component: FilePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilePagePageRoutingModule {}
