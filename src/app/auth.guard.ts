import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const permission = next.data["permission"];
    if (this.authService.isLoggedIn() && permission.only.includes(this.authService.getUserRole())) {
      return true;
    } else {
      console.log("You had been logout, You are not authorized to access the page");
      this.router.navigateByUrl('/logout');
    }
  }

}
