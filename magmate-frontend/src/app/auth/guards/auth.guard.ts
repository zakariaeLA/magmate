// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (!!user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

/*
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);

  async canActivate(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
*/