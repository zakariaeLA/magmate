import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Liste des routes qui nécessitent un token
    const protectedRoutes = [
      '/my-events',
      '/my-favorites',
      '/events/create',
      '/profile'
       // pour POST, PUT, DELETE
      // Ajoute ici les autres routes privées
    ];
        // Vérifie si la requête cible une route protégée

    const isProtected = protectedRoutes.some((route) =>
      req.url.includes(route)
    );
if (isProtected) {
    return from(this.authService.getIdToken()).pipe(
      switchMap((token) => {
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Token:', token);
          return next.handle(cloned);
        }
        return next.handle(req);
      })
    );
  } else {
      // Pour les routes publiques, ne rien ajouter
      return next.handle(req);
    }
  }
}
