import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './components/music.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MusicDialogComponent } from './music-dialog/music-dialog.component';
import { MusicViewsDialogComponent } from './music-views-dialog/music-views-dialog.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    MusicComponent,
    MusicDialogComponent,
    MusicViewsDialogComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule
  ]
})
export class MusicModule { }
