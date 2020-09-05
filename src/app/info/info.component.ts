import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  isAdmin = false;
  isStudent = false;
  roleName: string

  public moduleId;
  module: any = {};
  id: number;

   //module
   myForm: FormGroup;
   modulePic: string;
   modulePic2: string;
   modulePic3: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private modService: ModulesService,  private authService: AuthService,private modalService: NgbModal,
    private fb: FormBuilder, public _DomSanitizationService: DomSanitizer) {

      this.router.events.subscribe(event => {
        if (event.constructor.name == "NavigationEnd") {
    
          this.roleName = this.authService.getUserRole();
          console.log(this.roleName);
          if (this.roleName == "Student") 
          this.isStudent = true;
          else if (this.roleName == "Admin") this.isAdmin = true;
          else { 
            this.isStudent = false; this.isAdmin = false; 
          }
          console.log(this.isAdmin + ' or ' + this.isStudent);
        };
      })
      }

  ngOnInit() {
    let _id = this.route.snapshot.paramMap.get('id');
    this.moduleId = _id;

    this.modService.getOne(this.moduleId).subscribe(results => {
      this.module = results;
      console.log(this.module);
    });

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

  open(content) {
    this.modalService.open(content);
  }

  onSubmit() {
    this.modService.updateMod(
      this.moduleId,  
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
      ).subscribe();
    location.reload();
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

  delete() {
    this.modService.delete(this.moduleId).subscribe(results => {
      console.log(results + ' deleted');
      this.router.navigateByUrl('home');
    });
  }

}
