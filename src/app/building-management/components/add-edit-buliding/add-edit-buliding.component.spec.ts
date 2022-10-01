import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBulidingComponent } from './add-edit-buliding.component';

describe('AddEditBulidingComponent', () => {
  let component: AddEditBulidingComponent;
  let fixture: ComponentFixture<AddEditBulidingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBulidingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBulidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
