import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivemodulesComponent } from './electivemodules.component';

describe('ElectivemodulesComponent', () => {
  let component: ElectivemodulesComponent;
  let fixture: ComponentFixture<ElectivemodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivemodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivemodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
