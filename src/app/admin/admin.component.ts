import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmissionService } from '../submission.service';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  submissions: any = [];
  electives: any = [];

  constructor(public fb: FormBuilder, private submissionService: SubmissionService, private authService: AuthService,
    private router: Router) {
      
    this.submissionService.getAll().subscribe(result => {
      this.submissions = result;
    });

  }

  ngOnInit() {
  }

  deleteDeclaration(id: string) {
    this.submissionService.delete(id).subscribe(results => {
      window.alert('Medical declaration deleted');
      location.reload();
    });
  }

}
