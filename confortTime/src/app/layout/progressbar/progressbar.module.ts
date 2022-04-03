import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProgressbarComponent
  ]
})
export class ProgressbarModule { }
