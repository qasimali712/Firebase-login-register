import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private menuController: MenuController) {}

  toggleMenu() {
    this.menuController.toggle();
  }

  navigateToPage(route: string) {
    this.router.navigateByUrl(route);
    this.menuController.close();
  }

  logout() {
    this.menuController.close();
    this.router.navigate(['/']);
  }
}
