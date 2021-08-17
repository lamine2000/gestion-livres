import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
    });
  }

  onSubmit(){
    // @ts-ignore
    const email = this.signupForm.get('email').value;
    // @ts-ignore
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password).then(
      () => { this.router.navigate(['/books']);},
      (error) => { this.errorMessage = error; }
    );
  }

}
