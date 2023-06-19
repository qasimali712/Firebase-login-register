import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginData = {
    // user_name: '',
    user_password: '',
    // user_address: '',
    // user_type: '3',
    user_email: '',
    // user_status: '1',
    // user_mobile: '',
    // cPassword: '',
    // customer_id: '',
  };
  password!: string;
  confirmPassword!: string;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {}
  checkPasswordMatch() {
    if (
      this.password &&
      this.confirmPassword &&
      this.password !== this.confirmPassword
    ) {
      console.log('Passwords do not match.');
    } else {
      console.log('Passwords match.');
    }
  }
  async registerUser() {
    // Call the registerUser method from the AuthService
    try {
      await this.authService.registerUser(
        this.loginData.user_email,
        this.loginData.user_password
      );
      console.log('Registration Successful'); // Additional actions after successful registration
    } catch (error) {
      console.log('Registration error:', error); // Handle registration error
    }
    this.route.navigate(['/']);
  }
}
