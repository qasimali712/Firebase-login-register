import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  Form: FormGroup;
  isShowPassword: boolean = false;

  loginData = {
    login: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {
    this.Form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.Form.invalid) {
      return;
    }

    const email = this.Form.value.login;
    const password = this.Form.value.password;

    // Perform email and password validation without Firebase authentication
    if (!this.validateEmail(email)) {
      // Email is not valid, display error message or handle appropriately
      return;
    }

    if (!this.validatePassword(password)) {
      // Password is not valid, display error message or handle appropriately
      return;
    }

    try {
      await this.authService.loginUser(email, password);
      this.route.navigateByUrl('/dashboard');
    } catch (error) {
      // Handle login error (e.g., display error message)
    }
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  private validateEmail(email: string): boolean {
    // Perform email validation logic here
    // You can use regex or any other validation approach
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    // Perform password validation logic here
    // For example, check for a minimum length
    return password.length >= 6;
  }
}
