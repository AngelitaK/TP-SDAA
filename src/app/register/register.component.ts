import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//services
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  loading = false;
  hide = true;

  myForm: FormGroup;
  role: any = ['Student']

  // myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adminno: ['', Validators.required],
      fullname: ['', Validators.required],
      role: ['', [Validators.required]]
    });
  }

  //getters
  get Roles() {
    return this.myForm.get('Roles');
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    const email = this.f.email.value;
    const password = this.f.password.value;
    const adminno = this.f.adminno.value;
    const fullname = this.f.fullname.value;

    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.regUser(this.f.email.value, this.f.password.value, this.f.adminno.value, this.f.fullname.value, this.f.role.value)
      .subscribe(data => {
        console.log(data);
        window.alert("Successfully Registered!");
        this.alertService.success('Registration successful', true);
        this.router.navigateByUrl('/login');
      },
        error => {
          window.alert("Error Registering");
          console.log("Please fill up all the required sections")
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
