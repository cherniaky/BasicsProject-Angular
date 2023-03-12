import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {}
