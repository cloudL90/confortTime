import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvSeriesRoutingModule } from './tv-series-routing.module';
import  { TvSeriesComponent } from '../tv-series/component/tv-series.component';
import { TvSeriesDialogComponent } from './tv-series-dialog/tv-series-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TvseriesViewsDialogComponent } from './tvseries-views-dialog/tvseries-views-dialog.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    TvSeriesComponent,
    TvSeriesDialogComponent,
    TvseriesViewsDialogComponent
  ],
  imports: [
    CommonModule,
    TvSeriesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule
  ]
})
export class TvSeriesModule { }
