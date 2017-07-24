import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';

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
    retypedPassword: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        private fb: FormBuilder, private auth: AuthProvider, public alertCtrl: AlertController) {
        this.registerForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'retypedPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            
        });

        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.retypedPassword = this.registerForm.controls['retypedPassword'];
    }

    register(): void {
        if (this.registerForm.valid) {
            if (this.password.value !== this.retypedPassword.value) {
                console.log('pass '+ JSON.stringify(this.password) + " | rpass "+ JSON.stringify(this.retypedPassword));
                this.alert('As senhas devem ser iguais.');
                return;
            }
            var credentials = ({ email: this.email.value, password: this.password.value });
            this.auth.registerUser(credentials).subscribe(registerData => {
                console.log('User is registered and logged in.');
                console.log(registerData);
                this.navCtrl.setRoot('LoginPage');
            }, registerError => {
                console.log(registerError);
                if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use') {
                    this.alert('Ocorreu erro ao tentar registrar:' + registerError.message);
                }
                this.error = registerError;
                console.log('erro >> ', registerError);
            });
        }
    }

    alert(message: string) {
        let alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    
}