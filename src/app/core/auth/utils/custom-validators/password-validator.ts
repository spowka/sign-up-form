import { FormGroup } from '@angular/forms';

export function PasswordContainsName(firstNameControl: string, lastNameControl: string, passwordControl: string) {
    return (formGroup: FormGroup) => {
        const firstName = formGroup.controls[firstNameControl];
        const lastName = formGroup.controls[lastNameControl];
        const password = formGroup.controls[passwordControl];

        if ((password.value.includes(firstName.value) && firstName.value !== '') || (password.value.includes(lastName.value) && lastName.value !== '')) {
            password.setErrors({ ...password.errors, passwordContainsName: true });
        }
        else {
            password.errors && delete password.errors['passwordContainsName'];
            if (password.errors && !Object.keys(password.errors).length) {
                password.setErrors(null)
            }
        }
    }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ ...matchingControl.errors, confirmedValidator: true });
        } else {
            matchingControl.errors && delete matchingControl.errors['confirmedValidator'];
        }
    }

}
