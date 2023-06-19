import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  userData: any;
  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.getUserData();
    this.userData = history.state.userData;
  }
  async getUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      // Retrieve the user data from your service (e.g., UsersService)
      // and assign it to the 'userData' variable
      // this.userData = await this.authService.getUserData(user.uid);
    }
  }
  async saveProfile() {
    try {
      const user = await this.authService.getCurrentUser();
      if (user) {
        const uid = user.uid;

        // Ensure the email property is defined in the userData object
        if (!this.userData.email) {
          console.error('Email is required.');
          console.log('User UID : ', uid);
          return;
        }

        await this.userService.updateUserData(uid, this.userData);
        console.log('User data saved successfully');

        // Optionally, you can navigate back to the profile page
        this.route.navigate(['/profile'], {
          state: { userData: this.userData },
        });
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }
}
