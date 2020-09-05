import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  isAdmin = false;
  isStudent = false;
  roleName: string

  id: string = "";

  user: any[];
  email: string;
  adminno: string;


  constructor(private authService: AuthService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event.constructor.name == "NavigationEnd") {
        this.loggedIn = this.authService.isLoggedIn();
        this.loggedIn = true;
  
        this.roleName = this.authService.getUserRole();
        if (this.roleName == "Student") 
        this.isStudent = true;
        else if (this.roleName == "Admin") this.isAdmin = true;
        else { 
          this.isStudent = false; this.isAdmin = false; 
        }
      };
    })

    this.authService.getUserDetails(this.authService.getSecureToken()).subscribe(result => {
      if(result != null){
        this.user = result;
      }
    });
  }

  ngOnInit() {
  }

  goToAcc() {
    this.email = this.authService.getSecureToken();
    this.router.navigateByUrl('/account/' + this.email);
  }

}

