import { Component } from '@angular/core';

@Component({
  selector: 'DV-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DropVault';
  isAuth = false;
  lastUpdate = new Date();
}
