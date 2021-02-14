import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthModel } from '../models/auth.model';
import { BaseResponse } from '../models/base-response.model';
import { UserKey } from '../models/local-stoarge.enum';
import { UserRoles } from '../models/user-roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  loginUser(user: AuthModel) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(async result => {
      const role = (await this.firestore.collection(`usersCollection`, query => query.where('uid', '==', result.user?.uid)).get().toPromise()).docs[0].data();

      if (role && (role as { uid: string, role: UserRoles[] }).role.includes(UserRoles.DefaultUser)) {
        this.setDefaultUserInStoarge(user);

        return {
          result: result.user?.toJSON()
        } as BaseResponse
      }

      return {
        error: 'User is not authorized.'
      } as BaseResponse
    })
  }

  registerUser(user: AuthModel) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(createdUser => {
      this.firestore.collection("usersCollection")
        .add({
          uid: createdUser.user?.uid,
          role: ['default-user']
        });

      return {
        result: createdUser.credential?.toJSON()
      } as BaseResponse;
    })
  }

  loginManager(user: AuthModel) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(async result => {
      const role = (await this.firestore.collection(`usersCollection`, query => query.where('uid', '==', result.user?.uid)).get().toPromise()).docs[0].data();

      if (role && (role as { uid: string, role: UserRoles[] }).role.includes(UserRoles.Manager)) {
        this.setManagerInStoarge(user);

        return {
          result: result.user?.toJSON()
        } as BaseResponse
      }

      return {
        error: 'User is not authorized.'
      } as BaseResponse
    })
  }

  get isLoggedInDefaultUser() {
    const user = localStorage.getItem(UserKey.DEFAULT_USER);

    return user ? JSON.parse(user) : null;
  }

  setDefaultUserInStoarge(user: AuthModel) {
    localStorage.setItem(UserKey.DEFAULT_USER, JSON.stringify(user));
  }

  removeDefaultUserInStoarge() {
    localStorage.removeItem(UserKey.DEFAULT_USER);
  }

  loginDefaultUserWithCache() {
    if (this.isLoggedInDefaultUser) {
      return this.loginUser(this.isLoggedInDefaultUser).then(result => {
        return true;

        // this.router.navigate(['/general/news']);
      })
    }

    return false;
  }

  get isLoggedInManager() {
    const user = localStorage.getItem(UserKey.MANAGER);

    return user ? JSON.parse(user) : null;
  }

  setManagerInStoarge(user: AuthModel) {
    localStorage.setItem(UserKey.MANAGER, JSON.stringify(user));
  }

  removeManagerInStoarge() {
    localStorage.removeItem(UserKey.MANAGER);
  }

  loginManagerWithCache() {
    if (this.isLoggedInManager) {
      return this.loginUser(this.isLoggedInManager).then(result => {
        return true;
        // this.router.navigate(['/manager']);
      })
    }

    return false;
  }
}