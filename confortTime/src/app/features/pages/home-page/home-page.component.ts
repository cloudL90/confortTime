import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { AuthServiceService } from 'src/app/core/Auth/services/auth-service.service';
import { GetUrlService } from './services/get-url.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  name = 'Get Current Url Route Demo';
  home = '/';
  title = 'detect-route-change';
  currentRoute!: string;
  
  constructor(
    private router: Router,
    private serviceUrl: GetUrlService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {

    //to read url section
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;

        console.log(event.url);


        // if (this.currentRoute === '/libri') {
        //   alert('libri!');
        // }
        // if (this.currentRoute === '/film') {
        //   alert('film!');
        // }


        //*************call the service with the send message function here to send the section to the specific component****************
        this.send_Url(this.currentRoute);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });
  }
  //send url section to another component
  send_Url(route: string) {
    this.serviceUrl.sendUrl(this.currentRoute);
  }


  // <!--                                                                 - - - - - --->

  logout() {
    this.authService.logout();
  }  


}
