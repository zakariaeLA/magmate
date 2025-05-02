import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';
import { AlertService } from '../../services/alerte.service'; // Import du service d'alerte

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
      horaire: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    // Subscribe to alert service
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
  }

  // Handle main image selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file; // ✅ Stocke dans une propriété à part
    }
  }
  

  // Handle form submission
  onSubmit() {
    if (this.magasinForm.invalid) {
      return;
    }

    const magasinData = new FormData(); // Create FormData to append the store data

    // Append non-file form fields
    magasinData.append('nom', this.magasinForm.get('nom')?.value);
    magasinData.append('localisation', this.magasinForm.get('localisation')?.value);
    magasinData.append('description', this.magasinForm.get('description')?.value);
    magasinData.append('horaire', this.magasinForm.get('horaire')?.value);
    magasinData.append('telephone', this.magasinForm.get('telephone')?.value);
    magasinData.append('ville', this.magasinForm.get('ville')?.value);

    // Append main image
    if (this.imageFile) {
      magasinData.append('image', this.imageFile, this.imageFile.name);
    } else {
      console.error('L’image est manquante.');
      this.alertService.error("Veuillez sélectionner une image.");
      return;
    }
    
    console.log('Data sent to server:', magasinData); // Log the FormData before sending

    // Send the data to the backend via the service
    this.magasinService.createMagasin(magasinData).subscribe({
      next: (response) => {
        console.log('Store successfully created', response);
        this.alertService.success('votre magasin est crée avec succées');
        this.router.navigate(['/']);  // Navigate after successful creation
      },
      error: (error) => {
        console.error('Error creating store', error);
        this.alertService.error('il y a une erreur lors de la création, veuillez essayez plus tard');
      }
    });
  }

  // Method to close the alert
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}