import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/Auth/guards/auth-guard.service';

import { BooksComponent } from '../books/component/books.component';
import { MoviesComponent } from '../movies/components/movies.component';
import { MusicComponent } from '../music/components/music.component';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuardService],

    children: [

      { path: 'books', canActivate: [AuthGuardService], loadChildren: () => import('../books/books.module').then(m => m.BooksModule) },
      { path: 'movies', canActivate: [AuthGuardService], loadChildren: () => import('../movies/movies.module').then(m => m.MoviesModule) },
      { path: 'music', canActivate: [AuthGuardService], loadChildren: () => import('../music/music.module').then(m => m.MusicModule) },
      { path: 'tv-series', canActivate: [AuthGuardService], loadChildren: () => import('../tv-series/tv-series.module').then(m => m.TvSeriesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
