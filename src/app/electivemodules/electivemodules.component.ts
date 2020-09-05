import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

//services
import { ModulesService } from '../modules.service';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-electivemodules',
  templateUrl: './electivemodules.component.html',
  styleUrls: ['./electivemodules.component.css']
})
export class ElectivemodulesComponent implements OnInit {

  submissions: any = [];
  submissionss: any = [];

  stats: any = [
    'Accepted', 
    'Denied'
  ]

  isAdmin = false;
  isStudent = false;
  roleName: string
  email: string

  myForm: FormGroup;

  id: string = "";
  fullname: string;
  adminno: string;
  type: string;
  timing: string;
  modA: string;
  modB: string;
  status: string

  constructor(public fb: FormBuilder, private modalService: NgbModal,
    private submissionService: SubmissionService, private authService: AuthService, private modService: ModulesService,
    private router: Router) {

    //admin show all modules
    if (this.authService.getUserRole() === 'Admin') {
      this.submissionService.getAllElecAdmin().subscribe(result => {
        this.submissions = result;
        console.log(this.submissions);
        this.id = this.submissions._id;
        console.log(this.id);
      });
    }
    else {// student show specific elective module
      this.submissionService.getAllElec(this.authService.getSecureToken()).subscribe(result => {
        this.submissions = result;
        console.log(result);
      });
    }
    //user role
    this.router.events.subscribe(event => {
      if (event.constructor.name == "NavigationEnd") {
        this.roleName = this.authService.getUserRole();
        if (this.roleName == "Student")
          this.isStudent = true;
        else if (this.roleName == "Admin") this.isAdmin = true;
        else {
          this.isStudent = false; this.isAdmin = false;
        }
      };
    })
    this.email = this.authService.getSecureToken();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      // email: ['', Validators.required],
      // fullname: ['', Validators.required],
      // adminno: ['', Validators.required],
      // type: ['', Validators.required],
      // timing: ['', Validators.required],
      // modA: ['', Validators.required],
      // modB: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  //delete student sign up
  deleteStudentElective(id: string) {
    this.submissionService.deleteStudentElective(id).subscribe(results => {
      window.alert('Student elective module deleted');
      location.reload();
    });
  }

  increaseQuote(id: string){
    this.submissionService.increaseQuote(id, this.myForm.value.status).subscribe(results => {
      console.log(results);
    location.reload();
    });
  }

}
