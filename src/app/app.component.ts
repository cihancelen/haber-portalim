import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'haber-portalim-frontend';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loginDefaultUserWithCache();
    this.authService.loginManagerWithCache();
  }
}
