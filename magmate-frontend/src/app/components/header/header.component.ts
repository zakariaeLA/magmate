// header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  profilePhotoUrl: string | null = null;
  private profileUpdateSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;
  private authStateSubscription: Subscription | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // Attendre que Firebase ait bien récupéré l'utilisateur connecté
    this.authStateSubscription = this.afAuth.authState.subscribe(async user => {
      if (user) {
        await this.loadProfile();
      } else {
        // Utilisateur déconnecté → remettre l'image par défaut
        this.profilePhotoUrl = 'images/default-profile.png';
      }
    });

    // Mises à jour manuelles du profil
    this.profileUpdateSubscription = this.profileService.profileUpdated.subscribe(async () => {
      await this.loadProfile();
    });

    // Quand utilisateur se connecte via AuthService
    this.authSubscription = this.authService.userLoggedIn.subscribe(async () => {
      await this.loadProfile();
    });
  }

  ngOnDestroy(): void {
    this.profileUpdateSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
    this.authStateSubscription?.unsubscribe();
  }

  private async loadProfile() {
    try {
      const profile = await this.profileService.getProfile();
      this.profilePhotoUrl = profile.photo
        ? `${profile.photo}?${new Date().getTime()}`
        : 'images/default-profile.png';
    } catch (error) {
      console.error('Erreur de chargement du profil', error);
      this.profilePhotoUrl = 'images/default-profile.png';
    }
  }

  smoothScroll(event: any): void {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}


/**
 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private API = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {}

  

  getProfile(): Promise<any> {
    return firstValueFrom(this.http.get(this.API));
  }

  updateProfilePhoto(photoData: FormData): Promise<any> {
    return firstValueFrom(this.http.patch(${this.API}/update-photo, photoData));
  }
  
  

}

 */