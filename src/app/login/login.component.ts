import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//service
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  hide = true;

  myForm: FormGroup;
  results: any = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.myForm.invalid) { return; }
    this.loading = true;

    this.authService.authUser(this.f.email.value, this.f.password.value)
      .subscribe(data => {
        this.results = data;
        if (this.results[0].auth) {
          this.authService.setSecureToken(this.f.email.value);
          this.authService.setFullName(this.results[0].fullname);
          this.authService.setAdminNo(this.results[0].adminno);
          this.authService.setUserRole(this.results[0].role);
          this.authService.setId(this.results[0]._id);
          console.log(this.results[0]);
          console.log(data);
          window.alert("Successfully Logged In!");
          this.router.navigateByUrl('/home');
        }
      },
        error => {
          window.alert("Error logging in.");
          console.log("Wrong email or password");
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
