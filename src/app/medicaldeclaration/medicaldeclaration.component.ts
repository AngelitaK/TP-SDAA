import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,  Validators } from "@angular/forms";
import { SubmissionService } from '../submission.service';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicaldeclaration',
  templateUrl: './medicaldeclaration.component.html',
  styleUrls: ['./medicaldeclaration.component.css']
})
export class MedicaldeclarationComponent implements OnInit {
  email: string;

  isSubmitted = false;
  form: FormGroup = new FormGroup({});
  answers: string[] = ['Yes', 'No'];

  constructor(public fb: FormBuilder, private submissionService: SubmissionService, private authService: AuthService, private router: Router ) { 

    this.form = fb.group({
      question1: ['', [Validators.required]],
      question2: ['', [Validators.required]],
      question3: ['', Validators.required],
      question4: ['', Validators.required],
      question5: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(!this.form.valid) {
      return false;
    }
    else { //If form is valid
      this.submissionService.insert(this.authService.getSecureToken(), this.authService.getFullName(), this.authService.getAdminNo(), this.form.value.question1, this.form.value.question2, this.form.value.question3, this.form.value.question4, this.form.value.question5).subscribe(results => {
        window.alert("Medical Declaration Form Submitted.");
        this.router.navigateByUrl('/signup');
      });
      console.log(this.form.value);
    }
  }

}
