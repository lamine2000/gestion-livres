import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth!: Boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        this.isAuth = !!user;
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
