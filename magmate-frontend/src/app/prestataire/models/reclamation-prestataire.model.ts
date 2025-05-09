export interface Reclamationprestataire {
    idReclamation: string;
    description: string;
    date: Date;
    pieceJointe?: string | null;
    utilisateur: {
      id: string;
      fname: string;
      lname: string;
      email: string;
    };
    prestataire: {
      idPrestataire: string;
      specialite: string;
      ville: string;
    };
  }
  