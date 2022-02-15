import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public isLoading = false;
  public loadingSpiner = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loginForm.setValue({
      email: 'arschobanyan99@gmail.com',
      password: '12345678'
    })
  }

  public onSubmitFormLocalStorage() {
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      this.router.navigate(['dashboard']);
    }, 1500);
  }

  public onSubmit(loginForm: FormGroup) {
    this.loadingSpiner = true;
    this.isLoading = true;
    this.authService.user = this.loginForm.value;
    this.onSubmitFormLocalStorage();

  }
}
