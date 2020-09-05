import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  userEmail = new Subject();
  userName = new Subject();
  UserRole = new Subject();

  constructor(private http: HttpClient) { }

  /**  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER  AUTH USER */

  regUser(email: string, pw: string, adminno: string, fullname: string, role: string) {
    return this.http.post<any[]>('./api/reguser/', { 'email': email, 'password': pw, 'adminno': adminno, 'fullname': fullname, 'role': role });
  }

  authUser(email: string, pw: string) { //login
    return this.http.post<any[]>('./api/authuser/', { 'email': email, 'password': pw });
  }

  /**  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD  USER CRUD */

  getUserDetails(email:string)
  {
    return this.http.get<any[]>('./api/getUserDetails/' + email);
  }

  updateAccount(
    email: string, 
    adminno: string, 
    fullname: string, 
    role: string 
    ) {
    return this.http.put<any[]>('./api/updateUser/' + email, { 
      'adminno': adminno, 
      'fullname': fullname, 
      'role': role 
    });
  }

  deleteAccount(email: string) {
    return this.http.delete<any[]>('./api/deleteUser/' + email);
  }

  /** OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS OTHERS */

  setSecureToken(secure_token: string) {
    this.userEmail.next(secure_token);
    sessionStorage.setItem("LoggedIn", secure_token)
  }

  getSecureToken() {
    return sessionStorage.getItem("LoggedIn")
  }

  setUserRole(role: string) {
    this.UserRole.next(role);
    sessionStorage.setItem("UserRole", role);
  }

  getUserRole() {
    return sessionStorage.getItem("UserRole")
  }

  setFullName(fullname: string) {
    sessionStorage.setItem("fullname", fullname);
  }
  getFullName() {
    return sessionStorage.getItem("fullname")
  }

  setAdminNo(adminno: string){
    sessionStorage.setItem("adminno", adminno);
  }
  getAdminNo() {
    return sessionStorage.getItem("adminno")
  }

  setId(id: string) {
    sessionStorage.setItem("id", id);
  }
  getId() {
    return sessionStorage.getItem("id")
  }

  logout() {
    this.UserRole.next("");
    sessionStorage.removeItem("LoggedIn");
    sessionStorage.removeItem("UserRole");
    sessionStorage.clear();
  }

  isLoggedIn() {
    return this.getSecureToken() !== null;
  }
  isAdmin() {
    return (this.getUserRole() == "Admin");
  }
  isStudent() {
    return (this.getUserRole() == "Student" || this.getUserRole() == "Admin");
  }

}
