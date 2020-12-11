import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordTokenComponent } from './restore-password-token.component';

describe('RestorePasswordTokenComponent', () => {
  let component: RestorePasswordTokenComponent;
  let fixture: ComponentFixture<RestorePasswordTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorePasswordTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
