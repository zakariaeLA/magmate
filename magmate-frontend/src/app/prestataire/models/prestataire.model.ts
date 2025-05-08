import { User } from './user.model'; // Import de l'interface User
import { Avis } from './avis.model'; // Import de l'interface Avis
import { Reclamation } from './reclamation.model'; // Import de l'interface Reclamation

export interface Prestataire {
  idPrestataire: string; // UUID du prestataire
  specialite: string; // Spécialité du prestataire
  experience: string; // Expérience du prestataire
  localisation: string; // Localisation du prestataire
  disponibilite: boolean; // Indique si le prestataire est disponible
  telephone: string; // Numéro de téléphone du prestataire
  ville: string; // Ville du prestataire
  estApprouve: boolean; // Indique si le prestataire est approuvé
  idUtilisateur: string; // ID de l'utilisateur associé au prestataire
  utilisateur: User; // L'utilisateur associé au prestataire
  avis: Avis[]; // Liste des avis associés au prestataire
  reclamations: Reclamation[]; // Liste des réclamations associées au prestataire
}
