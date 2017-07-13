import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AuthProvider } from './../../providers/auth/auth';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loginForm: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private auth: AuthProvider, private fb: FormBuilder) {

        this.loginForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])]
        });

        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }

    login(): void {
        if (this.loginForm.valid) { 
            console.log(this.email.value, this.password.value);
            //alert('Implement authentication');
            let credentials = ({email: this.email.value, password: this.password.value});
            this.auth.loginWithEmail(credentials).subscribe(data => {
                console.log(data);
                this.navCtrl.setRoot('TabsPage');
            }, error => {
                console.log(error);
                if (error.code == 'auth/user-not-found') {
                    alert('Not Found');
                }
                if (error.code == 'auth/wrong-password') {

                }
            }); 
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
