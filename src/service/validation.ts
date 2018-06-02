import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('signupPassword').value; // to get value in input tag
       let confirmPassword = AC.get('signupRepassword').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('signupRepassword').setErrors( {MatchPassword: true} )
        } else {
            return null;
        }
    }
}