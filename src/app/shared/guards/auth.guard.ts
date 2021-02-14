import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.afAuth.currentUser;

    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      if (this.authService.isLoggedInDefaultUser) {
        return await this.authService.loginDefaultUserWithCache();

      } else if (this.authService.isLoggedInManager) {
        return await this.authService.loginManagerWithCache()

      } else {
        this.router.navigate(['/auth/login']);
      }
    }

    return isLoggedIn;
  }
}