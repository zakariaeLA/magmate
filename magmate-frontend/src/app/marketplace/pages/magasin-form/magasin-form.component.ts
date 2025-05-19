import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';
import { AlertService } from '../../services/alerte.service';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅

@Component({
  standalone: true,
  selector: 'app-magasin-form',
  templateUrl: './magasin-form.component.html',
  styleUrls: ['./magasin-form.component.scss'],
  imports: [CommonModule,ReactiveFormsModule], // ✅ add this
})
export class MagasinFormComponent implements OnInit {
  magasinForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;
  imageFile: File | null = null;
  userId: string | null = null;
  private apiUrl = 'http://localhost:3000'; // Your API base URL

  constructor(
    private fb: FormBuilder,
    private magasinService: MagasinService, // Use MagasinService instead of direct HTTP
    private alertService: AlertService,
    private authService: AuthService,
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

  async ngOnInit(): Promise<void> {
    this.userId = await this.authService.getUserId();
    
    if (!this.userId) {
      this.alertService.error('Vous devez être connecté pour créer un magasin');
      this.router.navigate(['/login']);
      return;
    }

    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
  }

    onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  async onSubmit() {
    if (this.magasinForm.invalid || !this.userId) return;

    if (!this.imageFile) {
      this.alertService.error("Veuillez sélectionner une image.");
      return;
    }

    try {
      // 1. Get UUID from Firebase UID
      const userUUID = await firstValueFrom(
        this.magasinService.getUserUUID(this.userId)
      );
      
      if (!userUUID.uuid) {
        throw new Error('UUID non trouvé dans la réponse');
      }

      // 2. Convert image to base64
      const imageBase64 = await this.fileToBase64(this.imageFile);

      // 3. Prepare the data object
      const magasinData = {
        proprietaireId: userUUID.uuid,
        nom: this.magasinForm.get('nom')?.value,
        description: this.magasinForm.get('description')?.value,
        image: imageBase64,
        localisation: this.magasinForm.get('localisation')?.value,
        horaire: this.magasinForm.get('horaire')?.value,
        telephone: this.magasinForm.get('telephone')?.value,
        ville: this.magasinForm.get('ville')?.value
      };

      // 4. Send to backend
      this.magasinService.createMagasin(magasinData).subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error)
      });

    } catch (error) {
      this.handleError(error);
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

  private handleSuccess(response: any): void {
    this.alertService.success('Magasin créé avec succès');
    this.router.navigate(['/']);
  }

  private handleError(error: any): void {
    console.error('Erreur:', error);
    const errorMessage = error.error?.message || 
                        error.message || 
                        'Erreur lors de la création du magasin';
    this.alertService.error(errorMessage);
  }

  closeAlert(): void {
    this.alertMessage = null;
    this.alertType = null;
  }
}