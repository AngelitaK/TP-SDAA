import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldeclarationComponent } from './medicaldeclaration.component';

describe('MedicaldeclarationComponent', () => {
  let component: MedicaldeclarationComponent;
  let fixture: ComponentFixture<MedicaldeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
