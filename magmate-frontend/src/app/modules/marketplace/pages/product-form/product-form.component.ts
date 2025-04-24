import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alerte.service'; // Import du service d'alerte

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService, // Injection du service
    private router: Router
  ) {
    this.productForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      imagePrincipale: ['', Validators.required], // Image principale requise
      images: ['', Validators.required],  // Images supplémentaires sont optionnelles
      magasinIdMagasin: ['', Validators.required] // ID du magasin est requis
    });
  }

  ngOnInit(): void {
    // S'abonner à l'alerte
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
  }

  // This method will handle converting the image principale to Base64
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result as string;
        this.productForm.patchValue({
          imagePrincipale: base64File  // Store the Base64 string of the image
        });
      };
      reader.readAsDataURL(file);  // Convert file to Base64
    }
  }

  // This method will handle converting other images to Base64
  onFilesChange(event: any): void {
    const files: FileList = event.target.files;  // Explicitly set files to FileList
    if (files.length > 0) {
      const base64Files: string[] = [];
      const filePromises = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64File = reader.result as string;  // Base64 string
            base64Files.push(base64File);
            resolve(base64File);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);  // Convert the file to Base64
        });
      });
  
      // Wait for all files to be converted to Base64 before updating the form
      Promise.all(filePromises)
        .then(() => {
          // Set the images in the form after all files are processed
          this.productForm.patchValue({
            images: base64Files
          });
        })
        .catch((error) => {
          console.error("Error converting files to Base64", error);
        });
    }
  }
  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = new FormData();
    console.log('Formulaire envoyé:', this.productForm.value);  // Affiche toutes les valeurs du formulaire
  
    productData.append('titre', this.productForm.get('titre')?.value);
    productData.append('description', this.productForm.get('description')?.value);
    productData.append('prix', this.productForm.get('prix')?.value);
    productData.append('magasinIdMagasin', this.productForm.get('magasinIdMagasin')?.value);

    // Add the Base64 image principale
    const imagePrincipale = this.productForm.get('imagePrincipale')?.value;
    if (imagePrincipale) {
      productData.append('imagePrincipale', imagePrincipale);  // This is already Base64
    }

    // Add additional images if available
    const imagesArray = this.productForm.get('images')?.value;
    if (imagesArray) {
      imagesArray.forEach((image: string) => {
        productData.append('images', image);  // These are already Base64
      });
    }

    // Send the data to the backend
    const formData = this.productForm.value;
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Produit créé avec succès', response);
        this.alertService.success('Le produit a été créé avec succès!');
        this.router.navigate(['/produits']);
      },
      error: (error) => {
        console.error('Erreur lors de la création du produit', error);
        this.alertService.error('Une erreur est survenue lors de la création du produit.');
      }
    });
  }
  
  // Method to close alert
  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}