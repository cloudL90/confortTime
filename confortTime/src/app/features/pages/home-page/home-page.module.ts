import { TvSeriesModule } from './../tv-series/tv-series.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BooksModule } from '../books/books.module';
import { MusicModule } from '../music/music.module';
import { MoviesModule } from '../movies/movies.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    LayoutModule,
  ]
})
export class HomePageModule { }
