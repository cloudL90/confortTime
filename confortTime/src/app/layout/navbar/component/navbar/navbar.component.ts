import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/Auth/services/auth-service.service';

@Component({
  selector: 'comforTime-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthServiceService

  ) { }

  ngOnInit(): void {
  }


  goToHome() {
    this.route.navigateByUrl('/');
    this.onTabClick(0);
  }

  goToBooks(num: number) {
    this.route.navigateByUrl('home/books');
    this.onTabClick(1);

  }

  goToMovies(num: number) {
    this.route.navigateByUrl('home/movies');
    this.onTabClick(2);
  }

  goToMusic(num: number) {
    this.route.navigateByUrl('home/music');
    this.onTabClick(3);
  }

  goToSeriesTv(num: number) {
    this.route.navigateByUrl('home/tv-series');
    this.onTabClick(4);
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  tabIndex = 0;

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  logout() {
    this.authService.logout();
  }



}


