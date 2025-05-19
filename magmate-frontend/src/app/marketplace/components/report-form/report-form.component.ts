// src/app/marketplace/components/report-form/report-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateReclamationDto } from '../../dto/create-reclamation.dto';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
  standalone:false
})
export class ReportFormComponent {
  @Output() report = new EventEmitter<CreateReclamationDto>();  // Événement émis pour notifier le parent
  reportForm: FormGroup;  // Formulaire réactif

  constructor(private fb: FormBuilder) {
    // Initialiser le formulaire avec des validations
    this.reportForm = this.fb.group({
      description: ['', Validators.required],
      pieceJointe: ['', Validators.required],
    });
  }

  // Méthode pour soumettre le formulaire
  submitReport(): void {
    if (this.reportForm.valid) {
      const formValue = this.reportForm.value;
      const reportData: CreateReclamationDto = {
        description: formValue.description,
        pieceJointe: formValue.pieceJointe,
        idCible: 0,  // Vous devrez peut-être ajouter un produit ID ici ou l'obtenir dynamiquement
        idUtilisateur: 0,  // Idem, vous devrez peut-être obtenir cet ID depuis un service utilisateur
      };
      this.report.emit(reportData);  // Émettre l'événement pour notifier le parent
    } else {
      console.log('Formulaire invalide');
    }
  }
}
