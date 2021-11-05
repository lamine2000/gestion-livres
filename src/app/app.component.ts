import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "gestion-livres";

  constructor(){
    const config = {
      apiKey: "AIzaSyC1wTGnbPafL4Fx2xNdMs6iYQ0CBQ4gZUo",
      authDomain: "gestion-livres-14180.firebaseapp.com",
      projectId: "gestion-livres-14180",
      storageBucket: "gestion-livres-14180.appspot.com",
      messagingSenderId: "875428021967",
      appId: "1:875428021967:web:02bdf65a9e66f78c0799ba",
      measurementId: "G-Y4GKLBKMLC"
    };
    firebase.default.initializeApp(config);
  }
}
