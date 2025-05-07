import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestataireService, Prestataire } from '../services/prestataire.service';

@Component({
  selector: 'app-prestataire-update',
  standalone:false,
  templateUrl: './prestataire-update.component.html',
  styleUrls: ['./prestataire-update.component.scss']
})
export class PrestataireUpdateComponent implements OnInit {
  form!: FormGroup;
  prestataire?: Prestataire;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private prestataireService: PrestataireService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.prestataireService.getMe().subscribe({
      next: (data) => {
        this.prestataire = data;
        this.initForm(data);
      },
      error: (err) => {
        console.error('Erreur de chargement du profil prestataire', err);
        this.alertType = 'error';
        this.alertMessage = 'Impossible de charger le profil prestataire.';
      }
    });
  }

  initForm(data: Prestataire): void {
    this.form = this.fb.group({
      specialite: [data.specialite, Validators.required],
      experience: [data.experience, Validators.required],
      localisation: [data.localisation, Validators.required],
      telephone: [data.telephone, Validators.required],
      ville: [data.ville, Validators.required],
      disponibilite: [data.disponibilite]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.prestataireService.update(this.form.value).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Profil mis à jour avec succès.';
      },
      error: (err) => {
        this.alertType = 'error';
        this.alertMessage = 'Erreur lors de la mise à jour.';
        console.error(err);
      }
    });
  }

  closeAlert(): void {
    this.alertMessage = null;
  }
}
