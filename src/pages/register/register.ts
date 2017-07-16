import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage({
})
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    registerForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider) {
        this.registerForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
    }

    register(): void {
        if (this.registerForm.valid) {
            var credentials = ({ email: this.email.value, password: this.password.value });
            this.auth.registerUser(credentials).subscribe(registerData => {
                console.log(registerData);
                // alert('User is registered and logged in.');
                this.navCtrl.setRoot('LoginPage');
            }, registerError => {
                console.log(registerError);
                if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use') {
                    alert(registerError.message);
                }
                this.error = registerError;
            });
        }
    }
}