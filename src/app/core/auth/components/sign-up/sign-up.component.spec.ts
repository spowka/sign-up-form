import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { By } from '@angular/platform-browser';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule,
         MatFormFieldModule, 
         MatInputModule, 
         HttpClientModule, 
         MatIconModule, 
         BrowserAnimationsModule
        ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const welcomeMessage = debugElement.query(By.css('.welcome-label h1'));
    expect(welcomeMessage.nativeElement.textContent).toContain('Welcome.');
  });

  it('should have form controls', () => {
    const form = component.registerForm;
    expect(form.contains('firstName')).toBeTruthy();
    expect(form.contains('lastName')).toBeTruthy();
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
    expect(form.contains('confirmPassword')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const submitButton = debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    // Fill in required fields with values
    component.registerForm.get('firstName')?.setValue('John');
    component.registerForm.get('lastName')?.setValue('Doe');
    component.registerForm.get('email')?.setValue('john.doe@example.com');
    component.registerForm.get('password')?.setValue('Password123');
    component.registerForm.get('confirmPassword')?.setValue('Password123');
    fixture.detectChanges();

    // Ensure the submit button is enabled after filling out required fields
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should display validation errors', () => {
    const emailInput = debugElement.query(By.css('input[formControlName="email"]'));
    emailInput.nativeElement.value = 'invalid-email';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });
});
