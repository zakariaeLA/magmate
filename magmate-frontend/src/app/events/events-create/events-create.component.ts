import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { EventType } from '../event.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css'],
  standalone: false,
})
export class EventsCreateComponent implements OnInit {
  eventForm: FormGroup;
  eventTypes = Object.values(EventType);
  isSubmitting = false;
  formError = '';
  
  // Liste prédéfinie de villes françaises (à adapter selon vos besoins)
  cities = [
    'Paris', 'Lyon', 'Marseille', 'Lille', 'Bordeaux', 
    'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'
  ];

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
  ) {
    this.eventForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      lieu: ['', Validators.required],
      type: [EventType.EVENT, Validators.required],
      date: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.markFormGroupTouched(this.eventForm);
      return;
    }

    this.isSubmitting = true;
    this.formError = '';

    // Formater la date si nécessaire
    const formData = {
      ...this.eventForm.value,
      date: new Date(this.eventForm.value.date)
    };

    this.eventsService.createEvent(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.router.navigate(['/events']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.formError = error.error?.message || 'Une erreur est survenue lors de la création de l\'événement';
        console.error('Erreur de création d\'événement', error);
      }
    });
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Vérifier si un champ a des erreurs et a été touché
  hasError(controlName: string, errorName?: string): boolean {
    const control = this.eventForm.get(controlName);
    if (errorName) {
      return !!control?.touched && control?.hasError(errorName);
    }
    return !!control?.touched && !!control?.errors;
  }

  // Annuler la création et retourner à la liste
  cancel(): void {
    this.router.navigate(['/events']);
  }
}