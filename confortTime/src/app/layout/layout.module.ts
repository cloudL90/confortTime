import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { FooterModule } from './footer/footer.module';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    NavbarModule,
    FooterModule,
    ProgressbarModule,
  ],
  declarations: [
  ]
})
export class LayoutModule { }
