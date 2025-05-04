import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';  // Service pour gérer les magasins
import { AlertService } from '../../services/alerte.service'; // Service pour afficher les alertes
import { AuthService } from 'C:/magmate/magmate-frontend/src/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-magasin-update',
  standalone: false,
  templateUrl: './magasin-update.component.html',
  styleUrls: ['./magasin-update.component.scss']
})
export class MagasinUpdateComponent implements OnInit {
  magasinForm: FormGroup;
  imagePreview: string | null = null;
  selectedImages: { file: File; preview: string }[] = [];
  existingImages: string[] = [];  // Pour stocker les URLs des images existantes
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  magasinId: number = 42;
  userId: string = '';  // Variable pour stocker l'ID de l'utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private magasinService: MagasinService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService // Injection du service AuthService
  ) {
    this.magasinForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      localisation: ['', Validators.required],
      horaire: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required],
      image: ['']
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

      this.authService.loginBackend().then(() => {
        // Stocker l'ID de l'utilisateur connecté
        this.userId = token;  // Utiliser le token ou l'ID de l'utilisateur
        this.loadMagasin();
      }).catch((error) => {
        console.error('Erreur de connexion avec le backend :', error);
      });
    }).catch((error) => {
      console.error('Erreur de récupération du token :', error);
    });
  }

  loadMagasin(): void {
    // Récupérer l'ID du magasin à partir de l'URL
    this.route.paramMap.pipe(
      switchMap(params => {
        this.magasinId = +params.get('id')!;
        console.log('ID du magasin récupéré :', this.magasinId);
        return this.magasinService.getMagasinById(this.magasinId);
      })
    ).subscribe(magasin => {
      console.log('Magasin récupéré :', magasin);
      // Si l'utilisateur connecté n'est pas le propriétaire du magasin, rediriger
      if (magasin.proprietaireId !== this.userId) {
        this.router.navigate(['/unauthorized']);  // Rediriger si l'utilisateur n'est pas le propriétaire
        return;
      }

      // Si l'utilisateur est le propriétaire, remplir le formulaire avec les données du magasin
      this.magasinForm.patchValue({
        nom: magasin.nom,
        description: magasin.description,
        localisation: magasin.localisation,
        horaire: magasin.horaire,
        telephone: magasin.telephone,
        ville: magasin.ville
      });

      if (magasin.image) {
        this.imagePreview = `http://localhost:3000/uploads/${magasin.image}`;
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagePreview = URL.createObjectURL(file);
      this.magasinForm.patchValue({
        image: file
      });
    }
  }

  onSubmit(): void {
    if (this.magasinForm.invalid) {
      return;
    }

    const magasinData = new FormData();
    const formValues = this.magasinForm.value;

    // Ajouter les champs à FormData
    for (const key in formValues) {
      if (formValues[key]) {
        magasinData.append(key, formValues[key]);
      }
    }

    // Ajouter l'ID du propriétaire (utilisateur connecté) automatiquement
    magasinData.append('proprietaireId', this.userId);

    // Appeler l'API pour mettre à jour le magasin
    this.magasinService.updateMagasin(this.magasinId, magasinData).subscribe({
      next: () => {
        this.alertService.success('Le magasin a été mis à jour avec succès!');
        this.router.navigate(['/magasins']);
      },
      error: (error) => {
        this.alertService.error('Une erreur est survenue lors de la mise à jour.');
      }
    });
  }

  // Méthode pour fermer l'alerte
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}
