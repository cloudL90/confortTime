import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './components/movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesDialogComponent } from './movies-dialog/movies-dialog.component';
import { MoviesViewsDialogComponent } from '../movies/movies-views-dialog/movies-views-dialog.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    MoviesComponent,
    MoviesDialogComponent,
    MoviesViewsDialogComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
  ]
})
export class MoviesModule { }
