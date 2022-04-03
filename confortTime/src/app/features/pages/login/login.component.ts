import { AuthServiceService } from './../../../core/Auth/services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//PROPRIETÀ
  constructor(private authservice:AuthServiceService) { }



  ngOnInit(): void {
  }

  //METODI
  login(){
    this.authservice.login();
  }

  logout(){
    this.authservice.logout();
  }
}
