import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  //get all med dec
  getAll() {
    return this.http.get<any[]>('./api/declaration');
  }

  //Submit Medical declaration
  insert(email: string, fullname: string, adminno: string, question1: string, question2: string, question3: string, question4: string, question5: string) {
    return this.http.post<any[]>('./api/declaration/', {
      'email': email, 'fullname': fullname, 'adminno': adminno, 'question1': question1, 'question2': question2, 'question3': question3, 'question4': question4, 'question5': question5
    });
  }

  //delete student declaration
  delete(id) {
    return this.http.delete<any[]>('./api/deleteDeclaration/' + id);
  }

  //Electives  Electives  Electives  Electives  Electives  Electives  Electives  Electives

  //get logged in users electives sign up
  getAllElec(useremail: string) {
    return this.http.get<any[]>('./api/allelectives/'+useremail);
  }

  //get all elec for admin
  getAllElecAdmin() {
    return this.http.get<any[]>('./api/allelectivesadmin/');
  }

  //sign up for electives
  signup(
    email: string,
    fullname: string,
    adminno: string, 
    type: string,
    timing: string,
    modA: string,
    modB: string
    ) {
    return this.http.post<any[]>('./api/electives/', {
      'email': email, 
      'fullname': fullname, 
      'adminno': adminno,
      'type': type,
      'timing': timing,
      'modA': modA,
      'modB': modB,
    });
  }

  //like update submission
  accept(
    email: string,
    fullname: string,
    adminno: string, 
    type: string,
    timing: string,
    modA: string,
    modB: string,
    status: string
    ) {
    return this.http.post<any[]>('./api/accept/', {
      'email': email, 
      'fullname': fullname, 
      'adminno': adminno,
      'type': type,
      'timing': timing,
      'modA': modA,
      'modB': modB,
      'status': status
    });
  }

  increaseQuote(id: string, status: string) {
    return this.http.put<any[]>('./api/accept/' + id, {'status': status });
  }

  //delete student elective signup
  deleteStudentElective(id) {
    return this.http.delete<any[]>('./api/deleteStudentElective/' + id);
  }

}
