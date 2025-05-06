// ✅ pages/prestataire.component.ts
import { Component, OnInit } from '@angular/core';
import { PrestataireService, Prestataire } from '../services/prestataire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prestataire',
  standalone:false,
  templateUrl: './prestataire.component.html',
  
})
export class PrestataireComponent implements OnInit {
  prestataire?: Prestataire;
  editing = false;
  form!: FormGroup;

  constructor(
    private prestataireService: PrestataireService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.prestataireService.getMe().subscribe(data => {
      this.prestataire = data;
      this.initForm(data);
    });
  }

  initForm(data?: Prestataire): void {
    this.form = this.fb.group({
      specialite: [data?.specialite || '', Validators.required],
      experience: [data?.experience || '', Validators.required],
      localisation: [data?.localisation || '', Validators.required],
      telephone: [data?.telephone || '', Validators.required],
      ville: [data?.ville || '', Validators.required],
      disponibilite: [data?.disponibilite ?? true]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dto = this.form.value;
      if (this.prestataire) {
        this.prestataireService.update(dto).subscribe(() => {
          this.editing = false;
          this.load();
        });
      } else {
        this.prestataireService.create(dto).subscribe(() => this.load());
      }
    }
  }

  delete(): void {
    this.prestataireService.delete().subscribe(() => {
      this.prestataire = undefined;
    });
  }
}