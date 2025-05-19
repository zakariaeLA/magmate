// magasin-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';  // Service pour gérer les magasins
import { AlertService } from '../../services/alerte.service'; // Service pour afficher les alertes
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-magasin-update',
  standalone:false,
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
  

  constructor(
    private fb: FormBuilder,
    private magasinService: MagasinService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
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
    // Subscribe to alert service
    this.alertService.alert$.subscribe(alert => {
        this.alertMessage = alert.message;
        this.alertType = alert.type;
      });
      this.route.paramMap.pipe(
        switchMap(params => {
          this.magasinId = +params.get('id')!;
          console.log('ID du magasin récupéré :', this.magasinId);  // Vérifiez l'ID
          return this.magasinService.getMagasinById(this.magasinId);
        })
      ).subscribe(magasin => {
        console.log('Magasin récupéré :', magasin);
        this.magasinForm.patchValue({
          nom: magasin.nom,
          description: magasin.description,
          localisation: magasin.localisation,
          horaire: magasin.horaire,
          telephone: magasin.telephone,
          ville: magasin.ville
        });
    
        if (magasin.image) {
          this.imagePreview = magasin.image ?`http://localhost:3000/uploads/${magasin.image}`:null;
          //this.imagePreview = product.imagePrincipale ? `http://localhost:3000/uploads/${product.imagePrincipale}` : null;

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

    // Appeler l'API pour mettre à jour le magasin
    this.magasinService.updateMagasin(this.magasinId, magasinData).subscribe({
      next: () => {
        this.alertService.success('Le magasin a été mis à jour avec succès!');
        this.alertService.success('votre magasin a été mis a jour avec succée');
        this.router.navigate(['/magasins']);
      },
      error: (error) => {
        this.alertService.error('Une erreur est survenue lors de la mise à jour.');
      }
    });
  }
  // Method to close the alert
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}
