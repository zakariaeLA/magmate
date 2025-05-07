import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';
import { AlertService } from '../../services/alerte.service'; // Import du service d'alerte
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-magasin-form',
  standalone: false,
  templateUrl: './magasin-form.component.html',
  styleUrls: ['./magasin-form.component.scss']
})
export class MagasinFormComponent implements OnInit {
  magasinForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;
  imageFile: File | null = null;
  userId: string = '';  // Pour stocker l'ID de l'utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private magasinService: MagasinService,
    private alertService: AlertService, // Injection du service
    private router: Router,
    private authService: AuthService  // Injection du service AuthService
  ) {
    this.magasinForm = this.fb.group({
      nom: ['', Validators.required],
      localisation: ['', Validators.required],
      description: ['', Validators.required],
      horaire: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.authService.getIdToken().then((token) => {
      if (!token) {
        // Si aucun token n'est trouvé, rediriger vers la page de connexion
        this.router.navigate(['/login']);
        return;
      }

      // En cas de succès, stocker l'ID de l'utilisateur
      this.userId = token;
    }).catch((error) => {
      console.error('Erreur de récupération du token :', error);
    });

    // Subscribe to alert service
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
  }

  // Gérer la sélection d'image
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;  // ✅ Stocke dans une propriété à part
    }
  }

  // Gérer la soumission du formulaire
  onSubmit() {
    if (this.magasinForm.invalid) {
      return;
    }

    const magasinData = new FormData(); // Créer FormData pour ajouter les données du magasin

    // Ajouter les champs non liés aux fichiers
    magasinData.append('nom', this.magasinForm.get('nom')?.value);
    magasinData.append('localisation', this.magasinForm.get('localisation')?.value);
    magasinData.append('description', this.magasinForm.get('description')?.value);
    magasinData.append('horaire', this.magasinForm.get('horaire')?.value);
    magasinData.append('telephone', this.magasinForm.get('telephone')?.value);
    magasinData.append('ville', this.magasinForm.get('ville')?.value);

    // Ajouter l'image principale
    if (this.imageFile) {
      magasinData.append('image', this.imageFile, this.imageFile.name);
    } else {
      console.error('L’image est manquante.');
      this.alertService.error("Veuillez sélectionner une image.");
      return;
    }

    // Ajouter l'ID du propriétaire (utilisateur connecté) à FormData
    magasinData.append('proprietaireId', this.userId);

    console.log('Data sent to server:', magasinData); // Afficher FormData avant l'envoi

    // Envoyer les données au backend via le service
    this.magasinService.createMagasin(magasinData).subscribe({
      next: (response) => {
        console.log('Magasin créé avec succès', response);
        this.alertService.success('Votre magasin a été créé avec succès');
        this.router.navigate(['/']);  // Redirection après création réussie
      },
      error: (error) => {
        console.error('Erreur lors de la création du magasin', error);
        this.alertService.error('Il y a une erreur lors de la création, veuillez réessayer plus tard');
      }
    });
  }

  // Méthode pour fermer l'alerte
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}
