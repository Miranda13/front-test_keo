import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShotComponent } from './add-shot.component';

describe('AddShotComponent', () => {
  let component: AddShotComponent;
  let fixture: ComponentFixture<AddShotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
