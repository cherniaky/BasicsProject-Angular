import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { routeType } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  route: routeType = 'r';

  constructor(private authService: AuthService){};

  ngOnInit() {
    this.authService.autoLogin();
  }

  onNavigate(route: routeType) {
    this.route = route;
  }
}
