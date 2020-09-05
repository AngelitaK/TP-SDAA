import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmissionService } from '../submission.service';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  isSubmitted = false;

  check: boolean = false;

  modules: any = [];
  lists: any =[];

  timings: any = [
    'TK3 Friday 4pm', 
    'TN2 Monday 4pm',
    'TB05 Monday 4pm',
    'TB06 Friday 4pm',
    'TB10 Thursday 4pm',
    'TB13 Thursday 4pm',
    'TB19 Monday 11am',
    'TC10 Tuesday 4pm',
    'TE41 Monday 4pm',
    'TG01 Wednesday 4pm',
  ]
  
  types: any = [
    'Sports & Wellness', 
    'Guided Learning', 
    'Enrichment'
  ]

  constructor(public fb: FormBuilder, private modService: ModulesService, private submissionService: SubmissionService,
    private authService: AuthService, private router: Router) {

    this.modService.getAll().subscribe(modules => {
      this.modules = modules;
      this.lists = modules;
      console.log(this.modules);
    });
    this.myForm = fb.group({
      type: ['', [Validators.required]],
      timing: ['', [Validators.required]],
      modA: ['', [Validators.required]],
      modB: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmitted = true;
    if(!this.myForm.valid) {
      return false;
    }
    else { //If form is valid
      this.submissionService.signup(
        this.authService.getSecureToken(),
         this.authService.getFullName(), 
         this.authService.getAdminNo(), 
         this.myForm.value.type, 
         this.myForm.value.timing,
         this.myForm.value.modA,
         this.myForm.value.modB,
         )
         .subscribe(results => {
        window.alert("Successfully submitted.");
        this.router.navigateByUrl('/electivemodules');
      });
      console.log(this.myForm.value);
    }
  }
}

