import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any = {};
  myForm: FormGroup;
  email: string;

  isAdmin = false;
  isStudent = false;
  roleName: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private http: HttpClient,
    public dialog: MatDialog) {

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
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email');
      this.getProfile();
    });

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      adminno: ['', Validators.required],
      fullname: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  getProfile() {
    this.authService.getUserDetails(this.email).subscribe(results => {
      this.myForm.patchValue(this.user);
      this.user = results;
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  open2(content2) {
    this.modalService.open(content2);
  }

  onSubmit() {
    this.authService.updateAccount(this.authService.getSecureToken(), this.myForm.value.adminno, this.myForm.value.fullname, this.authService.getUserRole()).subscribe();
    location.reload();
  }

  delete() {
    this.authService.deleteAccount(this.authService.getSecureToken()).subscribe(results => {
      window.alert('Account Deleted.')
      this.router.navigateByUrl('login');
    });
  }

}
