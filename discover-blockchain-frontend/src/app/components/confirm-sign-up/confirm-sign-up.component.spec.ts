import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmSignUpComponent} from './confirm-sign-up.component';

describe('ConfirmSignUpComponent', () => {
  let component: ConfirmSignUpComponent;
  let fixture: ComponentFixture<ConfirmSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
