import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator, PasswordContainsName } from '../../utils/custom-validators/password-validator';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/auth-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public registerForm: FormGroup;
  public hidePass = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$')]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: [ConfirmedValidator('password', 'confirmPassword'), PasswordContainsName('firstName', 'lastName', 'password')]
    }
    )
  }

  getFormControls() {
    return this.registerForm.controls;
  }

  onRegister(registerForm: FormGroup) {
    const userData: UserData = {
      firstName: this.getFormControls()['firstName'].value,
      lastName: this.getFormControls()['lastName'].value,
      email: this.getFormControls()['email'].value
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        throw new Error(err)
      },
      complete: () => {
        console.log('Completed !')
      }
    });
  }
}
