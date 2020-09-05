import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  modules: any = [];
  id: any = [];

  isAdmin = false;
  isStudent = false;
  roleName: string

  //add module
  myForm: FormGroup;
  modulePic: string;
  modulePic2: string;
  modulePic3: string;

  constructor(private modService: ModulesService, private authService: AuthService, private modalService: NgbModal,
    private router: Router, private fb: FormBuilder) {

    this.modService.getAll().subscribe(modules => {
      this.modules = modules;
      console.log(this.modules);
    });

    //show hide button
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
    this.myForm = this.fb.group({
      moduleName: ['', Validators.required],
      category: ['', Validators.required],
      classSize: ['', Validators.required],
      info: ['', Validators.required],
      venue: ['', Validators.required],
      modulePic: '',
      modulePic2: '',

      Mon11to1: false,
      Tues11to1: false,
      Wed11to1: false,
      Thurs11to1: false,
      Fri11to1: false,

      Mon4to6: false,
      Tues4to6: false,
      Wed4to6: false,
      Thurs4to6: false,
      Fri4to6: false
    });
  }

  //card flip
  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  //go to info page
  goToInfo(mod) {
    this.router.navigateByUrl('/info/' + mod);
    console.log(event);
  }

  open(content) {
    this.modalService.open(content);
  }

  onSubmit() {
    this.modService.insert(
      this.myForm.value.moduleName, 
      this.myForm.value.category, 
      this.myForm.value.classSize, 
      this.myForm.value.info,
      this.myForm.value.venue, 
      this.modulePic, 
      this.modulePic2,   
      this.myForm.value.Mon11to1,
      this.myForm.value.Tues11to1,
      this.myForm.value.Wed11to1,
      this.myForm.value.Thurs11to1,
      this.myForm.value.Fri11to1,

      this.myForm.value.Mon4to6,
      this.myForm.value.Tues4to6,
      this.myForm.value.Wed4to6,
      this.myForm.value.Thurs4to6,
      this.myForm.value.Fri4to6,
      ).subscribe(results => {
        window.alert("Added successfully");
        location.reload();
        this.router.navigateByUrl('home');
      });
  }

  imageString(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.modulePic = reader.result.toString().split(',')[1];
    }
  }

  imageString2(event) {
    let img = this;
    let file = event.target.files[0]; 
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      img.modulePic2 = reader.result.toString().split(',')[1];
    }
  }

}
