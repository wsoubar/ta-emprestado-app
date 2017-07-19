import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AuthProvider } from './../../providers/auth/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

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
        private auth: AuthProvider, private fb: FormBuilder, public alertCtrl: AlertController,
        private facebook: Facebook, private storage: Storage) {

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
            let credentials = ({ email: this.email.value, password: this.password.value });
            this.auth.loginWithEmail(credentials).subscribe(data => {
                //console.log(data);
                this.storage.set('userProfile', JSON.stringify(data));
                this.navCtrl.setRoot('TabsPage');
            }, error => {
                console.log(error);
                if (error.code == 'auth/user-not-found') {
                    this.alert('Usuário não encontrado.');
                }
                if (error.code == 'auth/wrong-password') {
                    this.alert('Usuário ou senha inválido.');
                }
            });
        }
    }

    alert(message: string) {
        let alert = this.alertCtrl.create({
            title: 'Te emprestei!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    facebookLogin() {
        console.log('>>>>>>>>>>>> facebookLogin <<<<<<<<<<<<<');
        this.facebook.login(['email'])  // 'public_profile', 'user_friends', 
            .then((res: FacebookLoginResponse) => {
                console.log('Logged into Facebook!', res);
                const facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(res.authResponse.accessToken);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then((success) => {
                        console.log("Firebase success: " + JSON.stringify(success));
                        this.storage.set('userProfile', JSON.stringify(success));
                        this.navCtrl.setRoot('TabsPage');
                    })
                    .catch((error) => {
                        console.log("Firebase failure: " + JSON.stringify(error));
                    });

            }
            )
            .catch(e => console.log('Error logging into Facebook', e));


        //this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }

    loginWithGoogle() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
