import { Component, OnInit } from '@angular/core';
import { ConnectionProfileService } from './connection-profile.service';
import { UserProfile } from './connection-profile.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-profile',
  standalone: false,
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.css']
})
export class ConnectionProfileComponent implements OnInit {
  specificUserId = 'f1abb309-55ea-4574-8c2e-314dd77a83d9'; // ID spécifique à comparer
  currentUserProfile!: UserProfile;
  specificUserProfile!: UserProfile;
  error: string | null = null;
  isLoading = true;
  requestStatus: string = 'not-sent';
  receivedRequests: any[] = [];
  currentRequestId: number | null = null;

  constructor(
    private connectionprofileService: ConnectionProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // 1. Récupérer l'ID de l'utilisateur courant via le token
      const currentUserId = await this.authService.getUserIdByToken();

      if (!currentUserId) {
        this.error = "Impossible de récupérer l'utilisateur courant.";
        return;
      }

      // 2. Récupérer les deux profils
      const [currentProfile, specificProfile] = await Promise.all([
        this.connectionprofileService.getSpecificUserProfile(currentUserId),
        this.connectionprofileService.getSpecificUserProfile(this.specificUserId)
      ]);

      this.currentUserProfile = currentProfile;
      this.specificUserProfile = specificProfile;

    } catch (err: any) {
      this.error = err.message || 'Erreur lors du chargement des profils';
    } finally {
      this.isLoading = false;
    }
  }

  checkRequestStatus() {
    this.connectionprofileService.getUserRequestStatus(this.specificUserId)
      .subscribe({
        next: (response) => {
          this.requestStatus = response.status;
          // Si c'est une demande reçue, on cherche l'ID de la demande
          if (response.status === 'waiting-for-current-user-response') {
            this.findCurrentRequestId();
          }
        },
        error: (err) => {
          console.error('Error checking request status:', err);
        }
      });
  }

  findCurrentRequestId() {
    this.connectionprofileService.getReceivedRequests()
      .subscribe({
        next: (requests) => {
          const request = requests.find(r => 
            r.creator.id === this.specificUserId && 
            r.receiver.id === this.currentUserProfile.id
          );
          if (request) {
            this.currentRequestId = request.id;
          }
        },
        error: (err) => {
          console.error('Error finding request ID:', err);
        }
      });
  }

  getReceivedFriendRequests() {
    this.connectionprofileService.getReceivedRequests()
      .subscribe({
        next: (requests) => {
          this.receivedRequests = requests;
        },
        error: (err) => {
          console.error('Error getting received requests:', err);
        }
      });
  }

  sendFriendRequest() {
    this.connectionprofileService.sendUserRequest(this.specificUserId)
      .subscribe({
        next: (response: any) => {
          if (response.error) {
            this.error = response.error;
          } else {
            this.requestStatus = 'pending';
          }
        },
        error: (err) => {
          console.error('Error sending friend request:', err);
          this.error = err.error?.message || 'Erreur lors de l\'envoi de la demande';
        }
      });
  }

  respondToRequest(status: string) {
    if (!this.currentRequestId) return;
    
    this.connectionprofileService.respondToUserRequest(this.currentRequestId, status)
      .subscribe({
        next: (response) => {
          this.requestStatus = status;
          this.currentRequestId = null;
        },
        error: (err) => {
          console.error('Error responding to request:', err);
          this.error = err.error?.message || 'Erreur lors de la réponse à la demande';
        }
      });
  }

}
