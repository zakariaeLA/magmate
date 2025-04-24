import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';
import { AlertService } from '../../services/alerte.service'; // Import du service d'alerte

@Component({
  selector: 'app-magasin-form',
  standalone:false,
  templateUrl: './magasin-form.component.html',
  styleUrls: ['./magasin-form.component.scss']
})
export class MagasinFormComponent implements OnInit {
  magasinForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  constructor(
    private fb: FormBuilder,
    private magasinService: MagasinService,
    private alertService: AlertService, // Injection du service
    private router: Router
  ) {
    this.magasinForm = this.fb.group({
      nom: ['', Validators.required],
      localisation: ['', Validators.required], 
      description: ['', Validators.required],
      
      image: ['', Validators.required],
      horaire: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // S'abonner à l'alerte
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;  // message est maintenant une propriété de l'objet
      this.alertType = alert.type;        // type est une propriété de l'objet
    });
  }

  onSubmit() {
    if (this.magasinForm.invalid) {
      return;
    }

    const magasinData = new FormData();
    magasinData.append('nom', this.magasinForm.get('nom')?.value);
    magasinData.append('localisation', this.magasinForm.get('localisation')?.value);
    magasinData.append('description', this.magasinForm.get('description')?.value);
    magasinData.append('image', this.magasinForm.get('image')?.value);
    magasinData.append('horaire', this.magasinForm.get('horaire')?.value);
    magasinData.append('telephone', this.magasinForm.get('telephone')?.value);
    magasinData.append('ville', this.magasinForm.get('ville')?.value);
    

    this.magasinService.createMagasin(magasinData).subscribe({
      next: (response) => {
        console.log('Magasin créé avec succès', response);
        this.alertService.success('Le magasin a été créé avec succès!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur lors de la création du magasin', error);
        this.alertService.error('Une erreur est survenue lors de la création du magasin.');
      }
    });
  }

  // Méthode pour fermer la modale
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}
