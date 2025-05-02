import { Component} from '@angular/core';



@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // le défilement fluide
  smoothScroll(event: any): void {
    event.preventDefault(); // Empêche le comportement de lien standard
    
    const targetId = event.target.getAttribute('href').substring(1); 
    const targetElement = document.getElementById(targetId); 

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}