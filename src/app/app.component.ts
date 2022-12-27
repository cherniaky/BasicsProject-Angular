import { Component } from '@angular/core';
import { routeType } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  route: routeType = 'r';

  
  onNavigate(route: routeType) {
    this.route = route;
  }
}
