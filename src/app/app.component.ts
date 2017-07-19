import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        private afAuth: AngularFireAuth, private loadingCtrl: LoadingController) {
        this.presentLoadingDefault();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.afAuth.authState.subscribe(auth => {
                // console.log('auth se ja esta logado >>> ' + JSON.stringify(auth));
                if (!auth) {
                    this.rootPage = 'LoginPage';
                } else {
                    this.rootPage = 'TabsPage';
                }
            });


            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 3000);
    }
}

