import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  insertContact (email: string, fullname: string, message: string) {
    return this.http.post<any[]>('./api/contact/', {'email': email, 'fullname': fullname, 'message': message });
    }
}
