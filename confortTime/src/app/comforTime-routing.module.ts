import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/Auth/guards/auth-guard.service';
import { Oauth2Guard } from './core/Auth/guards/oauth2.guard';
import { LoginComponent } from './features/pages/login/login.component';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], loadChildren: () => import('./features/pages/home-page/home-page.module').then(m => m.HomePageModule) },
  // {
  //   path: 'books',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./features/pages/books/books.module').then(m => m.BooksModule)
  // },
  // {
  //   path: 'movies',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./features/pages/movies/movies.module').then(m => m.MoviesModule)
  // },
  // {
  //   path: 'music',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./features/pages/music/music.module').then(m => m.MusicModule)
  // },
  // {
  //   path: 'serieTv',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./features/pages/tv-series/tv-series.module').then(m => m.TvSeriesModule)
  // },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./features/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'access_token',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivateChild: [Oauth2Guard]
  },
  {
    path: 'id_token',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivateChild: [Oauth2Guard]
  },
  {
    path: 'error',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [Oauth2Guard],
  },
  //#endregion OAUTH2
  {
    path: '**',
    redirectTo: 'home'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
