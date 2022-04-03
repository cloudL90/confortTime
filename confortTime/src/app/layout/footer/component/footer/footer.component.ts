import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/core/Auth/services/auth-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  } 
}
