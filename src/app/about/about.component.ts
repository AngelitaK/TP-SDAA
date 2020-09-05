import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  users: any = []
  email: string = ""
  fullname: string = ""

  myForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private contactService: ContactService, private authService: AuthService ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      fullname: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f(){
    return this.myForm .controls;
  }


  onSubmit(){
    this.isSubmitted = true;
    if(!this.myForm.valid) {
      return false;
    }
    else{
      this.contactService.insertContact(this.myForm.value.email, this.myForm.value.fullname, this.myForm.value.message).subscribe(results => {
        window.alert("Message Sent.");
        location.reload();
      });
    }
  }

}
