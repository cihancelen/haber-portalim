import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-manager-layout',
  templateUrl: 'manager-layout.component.html'
})

export class ManagerLayoutComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logout() {
    this.afAuth.signOut().then(result => {
      this.authService.removeManagerInStoarge();

      this.router.navigate(['/auth/manager-login']);
    });
  }
}