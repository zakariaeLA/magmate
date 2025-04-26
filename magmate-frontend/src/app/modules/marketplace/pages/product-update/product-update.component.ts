import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alerte.service'; // Import du service d'alerte

@Component({
  selector: 'app-product-update',
  standalone:false,
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  productForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;
  isEditing = true;
  imagePreview: string | null = null;
  selectedImages: any[] = [];
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService, // Injection du service
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      imagePrincipale: ['', Validators.required],
      images: [''],
      magasinIdMagasin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });

    // Subscribe to alerts
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(product  => {
      this.productForm.patchValue({
        titre: product.titre,
        description: product.description,
        prix: product.prix,
        magasinIdMagasin: product.magasin.idMagasin
      });

      // Set the preview for the main image
      this.imagePreview = `http://localhost:3000/uploads/${product.imagePrincipale}`;
      
      // Set images if there are any additional images
      if (product.images) {
        this.selectedImages = product.images.map((image: any) => ({
          preview: `http://localhost:3000/uploads/${image}`
        }));
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        imagePrincipale: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onFilesChange(event: any): void {
    const files = event.target.files;
    this.selectedImages = [];
  
    if (files.length > 0) {
      // Vérifiez et assurez-vous que chaque fichier est de type Blob/MediaSource
      const fileArray = Array.from(files);
  
      this.selectedImages = fileArray.map(file => {
        if (file instanceof Blob) {
          return {
            file,
            preview: URL.createObjectURL(file) // Créez un objet URL pour le fichier
          };
        } else {
          console.error('Le fichier sélectionné n\'est pas valide');
          return null;  // Vous pouvez gérer l'erreur ici si nécessaire
        }
      }).filter(item => item !== null);  // Retirer les éléments null (les fichiers invalides)
    }
  }
  
  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = new FormData();
    productData.append('titre', this.productForm.get('titre')?.value);
    productData.append('description', this.productForm.get('description')?.value);
    productData.append('prix', this.productForm.get('prix')?.value);
    productData.append('magasinIdMagasin', this.productForm.get('magasinIdMagasin')?.value);

    const imagePrincipale = this.productForm.get('imagePrincipale')?.value;
    if (imagePrincipale && imagePrincipale instanceof File) {
      productData.append('imagePrincipale', imagePrincipale, imagePrincipale.name);
    }

    const imagesArray = this.productForm.get('images')?.value;
    if (imagesArray && imagesArray instanceof Array) {
      imagesArray.forEach((image: File) => {
        productData.append('images', image, image.name);
      });
    }

    this.productService.updateProduct(this.productId!, productData).subscribe({
      next: (response) => {
        this.alertService.success('Produit mis à jour avec succès!');
        this.router.navigate(['/produits']);
      },
      error: (error) => {
        this.alertService.error('Erreur lors de la mise à jour du produit.');
      }
    });
  }

  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }
}
