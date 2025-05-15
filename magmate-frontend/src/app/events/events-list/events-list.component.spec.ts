import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  favoritesIds: string[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadFavorites();
  }

  loadEvents() {
    this.eventsService.getAllEvents().subscribe(events => this.events = events);
  }

  loadFavorites() {
    this.eventsService.getFavorites().subscribe(favs => {
      this.favoritesIds = favs.map(f => f.id);
    });
  }

  isFavorite(eventId: string): boolean {
    return this.favoritesIds.includes(eventId);
  }

  toggleFavorite(event: Event, e: MouseEvent): void {
    e.stopPropagation();
    if (this.isFavorite(event.id)) {
      this.eventsService.removeFromFavorites(event.id).subscribe(() => {
        this.favoritesIds = this.favoritesIds.filter(id => id !== event.id);
      });
    } else {
      this.eventsService.addToFavorites(event.id).subscribe(() => {
        this.favoritesIds.push(event.id);
      });
    }
  }
}