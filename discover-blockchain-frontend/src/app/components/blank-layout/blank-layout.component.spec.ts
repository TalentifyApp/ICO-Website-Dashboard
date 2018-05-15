import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankComponentComponent } from './blank-layout.component';

describe('BlankComponentComponent', () => {
  let component: BlankComponentComponent;
  let fixture: ComponentFixture<BlankComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
