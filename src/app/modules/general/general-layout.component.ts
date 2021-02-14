import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-general-layout',
  templateUrl: 'general-layout.component.html'
})

export class GeneralLayoutComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logout() {
    this.afAuth.signOut().then(result => {
      this.authService.removeDefaultUserInStoarge();

      this.router.navigate(['/auth/login']);
    });
  }
}