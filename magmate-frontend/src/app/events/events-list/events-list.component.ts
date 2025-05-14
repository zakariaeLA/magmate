import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { Event, EventType } from '../event.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  standalone: false,
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  favorites: Set<string> = new Set();
  filterForm: FormGroup;
  eventTypes = Object.values(EventType);
  isLoading = false;
  cities: string[] = [];
  isAuthenticated = false;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      city: [''],
      type: ['']
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    
    
    // Récupération des favoris si l'utilisateur est connecté
    if (this.isAuthenticated) {
      this.loadFavorites();
    }

    // Réagir aux changements de filtres
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }



  loadEvents(): void {
    this.isLoading = true;
    this.eventsService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.extractCities();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements', error);
        this.isLoading = false;
      }
    });
  }

  loadFavorites(): void {
    this.eventsService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = new Set(favorites.map(event => event.id));
      },
      error: (error) => {
        console.error('Erreur lors du chargement des favoris', error);
      }
    });
  }

  extractCities(): void {
    // Extraire les villes uniques des événements
    const uniqueCities = new Set(this.events.map(event => event.city));
    this.cities = Array.from(uniqueCities);
  }

  applyFilters(): void {
    const { searchTerm, city, type } = this.filterForm.value;
    
    let filteredEvents = this.events;
    
    // Filtre par terme de recherche (titre ou description)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term)
      );
    }
    
    // Filtre par ville
    if (city) {
      filteredEvents = filteredEvents.filter(event => event.city === city);
    }
    
    // Filtre par type
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }
    
    // Mise à jour de la liste des événements filtrés
    this.events = filteredEvents;
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.loadEvents();
  }

  toggleFavorite(event: Event, e: MouseEvent): void {
    e.stopPropagation(); // Empêcher la propagation du clic à la carte
    
  
    if (this.favorites.has(event.id)) {
      this.eventsService.removeFromFavorites(event.id).subscribe({
        next: () => {
          this.favorites.delete(event.id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du favori', error);
        }
      });
    } else {
      this.eventsService.addToFavorites(event.id).subscribe({
        next: () => {
          this.favorites.add(event.id);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout aux favoris', error);
        }
      });
    }
  }

  viewEventDetails(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }

  createEvent(): void {
   
    this.router.navigate(['/events/create']);
  }

  isFavorite(eventId: string): boolean {
    return this.favorites.has(eventId);
  }

  returnmyEvent(): void {
  window.location.href = '/events/my-events';
}
}
