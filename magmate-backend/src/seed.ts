import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Utilisateur } from './marketplace/entities/utilisateur.entity';
import { Magasin } from './marketplace/entities/magasin.entity';
import { Produit } from './marketplace/entities/produit.entity';
import { ImageProd } from './marketplace/entities/produit-image.entity';
import { Avis } from './marketplace/entities/avis.entity';
import { Reclamation } from './marketplace/entities/reclamation.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('🔄 Insertion des données de test...');

  // ✅ 1. Créer un nouvel utilisateur
  const utilisateurRepo = dataSource.getRepository(Utilisateur);
  const utilisateur = utilisateurRepo.create({
    nom: 'Bouchama',
    prenom: 'Ahmedao',
    email: 'ahmedao.new@example.com',
    photoProfil: 'profil.jpg',  // Nouvelle image de profil
    dateInscription: new Date(),
    motDePasse: '123456', // Mot de passe sécurisé (ne pas stocker en clair en production)
  });
  await utilisateurRepo.save(utilisateur);
  console.log('👤 Nouvel utilisateur ajouté avec l\'ID:', utilisateur.idUtilisateur);

  // ✅ 2. Créer un nouveau magasin
  const magasinRepo = dataSource.getRepository(Magasin);
  const magasin = magasinRepo.create({
    nom: 'Magasin4',
    description: 'Magasin spécialisé dans l\'artisanat marocain et les produits traditionnels.',
    image: 'magasin3.jpg',  // Nouvelle image pour le magasin
    dateCreation: new Date(),
    localisation: 'Place de Marrakech',
    horaire: '10h - 19h',
    telephone: '0612345678',
    ville: 'Marrakech',
    proprietaire: utilisateur,  // Lier l'utilisateur Ahmed comme propriétaire du magasin
  });
  await magasinRepo.save(magasin);
  console.log('🏪 Nouveau magasin ajouté avec l\'ID:', magasin.idMagasin);

  // ✅ 3. Créer un nouveau produit
  const produitRepo = dataSource.getRepository(Produit);
  const produit = produitRepo.create({
    titre: 'Belgha en laine',
    description: 'Belgha artisanale fabriquée à la main avec du cuir et de la laine.',
    prix: 450,
    imagePrincipale: 'belgha2.jpg',  // Réutiliser une image existante
    dateAjout: new Date(),
    magasin: magasin,  // Lier le produit au magasin créé
  });
  await produitRepo.save(produit);
  console.log('📦 Nouveau produit ajouté avec l\'ID:', produit.idProduit);

  // ✅ 4. Ajouter des images pour le produit
  const imageRepo = dataSource.getRepository(ImageProd);
  const imageUrls = [
    'http://localhost:3000/public/images/belgha1.jpg',
    'http://localhost:3000/public/images/belgha4.jpg',
    'http://localhost:3000/public/images/belgha3.jpg',
  ];

  for (const url of imageUrls) {
    const image = imageRepo.create({
      imageURL: url,
      produit: produit,  // Lier chaque image au produit
    });
    await imageRepo.save(image);
  }
  console.log('🖼️ Images ajoutées pour le produit');

  // ✅ 5. Ajouter un avis pour le produit
  const avisRepo = dataSource.getRepository(Avis);
  const avis = avisRepo.create({
    note: 5,  // Note de 5 étoiles (note valide entre 1 et 5)
    commentaire: 'Produit superbe et de très bonne qualité, je recommande vivement !',
    date: new Date(),
    auteur: utilisateur,  // Utilisateur qui a laissé l'avis
    produit: produit,  // Produit auquel l'avis est associé
  });
  await avisRepo.save(avis);
  console.log('⭐ Avis ajouté');

  // ✅ 6. Ajouter un signalement pour le produit
  const reclamationRepo = dataSource.getRepository(Reclamation);
  const signalement = reclamationRepo.create({
    description: 'Le produit ne correspond pas à la description, il semble de mauvaise qualité.',
    dateCreation: new Date(),
    pieceJointe: '',  // Pièce jointe (laisser vide pour le test)
    idCible: produit.idProduit,  // Le produit concerné par le signalement
    utilisateur: utilisateur,  // L'utilisateur qui signale
  });
  await reclamationRepo.save(signalement);
  console.log('🚩 Signalement ajouté');

  console.log('✅ Tous les éléments ont été insérés avec succès dans la base de données.');
  await app.close();
}

bootstrap();
