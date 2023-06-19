import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UsersService
  ) {
    this.userData = {};
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.getUserData();
  }

  async getUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const { uid, email } = user;
      this.userData = await this.userService.getUserData(uid);
      this.userData.email = email;
      console.log('Retrieved user data:', this.userData);
    }
  }

  gotoEdit() {
    const userDataToPass = {
      email: this.userData?.email, // Use optional chaining in case userData is undefined
      name: this.userData?.name,
      phone: this.userData?.phone,
      address: this.userData?.address,
    };
    this.route.navigate(['/editprofile'], {
      state: { userData: userDataToPass },
    });
  }
}
