import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tableData: any[] = [
    // { id: 1, name: 'Item 1', quantity: 5 },
    // { id: 2, name: 'Item 2', quantity: 10 },
    // { id: 3, name: 'Item 3', quantity: 2 },
  ];
  isLoading = true;
  user: any;
  driver: any;
  constructor(
    private router: Router,
    private UsersSer: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.refreshData();
  }
  async refreshData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      try {
        const userData = await this.UsersSer.getUserData(user.uid);
        this.tableData = [userData];
        this.isLoading = false;
        this.user = await this.UsersSer.getUser();
        this.driver = await this.UsersSer.getDriver();
        console.log('User data', this.user);
        console.log('Driver data', this.driver);
      } catch (error) {
        // Handle error fetching user data
      }
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
