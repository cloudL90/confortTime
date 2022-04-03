import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../features/pages/login/login.component';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FeaturesModule { }
