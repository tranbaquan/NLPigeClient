import { AbstractControl } from '@angular/forms';
import { UserInforService } from './userinfor-service';
import { ResponseCode } from '../secret/response-code';
import { Injectable } from '@angular/core';

@Injectable()
export class PasswordValidation {

    constructor(private userInforService: UserInforService) {
    }
    matchPassword(AC: AbstractControl) {
        let password = AC.get('signupPassword').value; // to get value in input tag
        let confirmPassword = AC.get('signupRepassword').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('signupRepassword').setErrors({ matchPassword: true })
        } else {
            return null;
        }
    }

    matchPhone(AC: AbstractControl) {
        let phone = AC.get('formphone').value;
        this.userInforService.findPhone(phone)
            .then(data => {
                return null;
            })
            .catch(error => {
                AC.get('formphone').setErrors({
                    matchPhone: true
                });
            });

    }
}