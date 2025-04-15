import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import ScrollReveal from 'scrollreveal';
import { ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true, 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]

})
export class HomeComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  currentLanguage: 'french' | 'arabic' = 'arabic';
  isVideoPlaying = false;

  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('menuBtnIcon') menuBtnIcon!: ElementRef;
  @ViewChild('headerVideo') headerVideo!: ElementRef;
  @ViewChild('headerImage') headerImage!: ElementRef;
  @ViewChild('translateBtn') translateBtn!: ElementRef;
  @ViewChild('arabicParagraph') arabicParagraph!: ElementRef;
  @ViewChild('frenchParagraph') frenchParagraph!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initScrollReveal();
  }

  ngAfterViewInit(): void {
    this.initSwiper();
    this.initVideo();
    this.initAutoTranslate();
    this.setupMenuToggle();
    
  }


  smoothScroll(event: any): void {
    event.preventDefault(); 
    
    const targetId = event.target.getAttribute('href').substring(1); 
    const targetElement = document.getElementById(targetId); 

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
      });
    }
  }

  private setupMenuToggle(): void {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");

    menuBtn?.addEventListener("click", (e) => {
      navLinks?.classList.toggle("open");

      const isOpen = navLinks?.classList.contains("open");
      if (menuBtnIcon) {
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      }
    });

    navLinks?.addEventListener("click", (e) => {
      navLinks?.classList.remove("open");
      if (menuBtnIcon) {
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateMenuIcon();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.updateMenuIcon();
  }

  private updateMenuIcon(): void {
    if (this.menuBtnIcon) {
      this.menuBtnIcon.nativeElement.className = this.isMenuOpen ? 'ri-close-line' : 'ri-menu-line';
    }
  }

  

  

toggleLanguage(): void {
  this.currentLanguage = this.currentLanguage === 'french' ? 'arabic' : 'french';

  setTimeout(() => {
    ScrollReveal().reveal(".showcase__content p", {
      origin: "bottom",
      distance: "50px",
      duration: 500,
      delay: 600
    });
  }, 15); // petit délai pour laisser le temps au DOM d'afficher le <p>
}


/*
  private updateParagraphVisibility(): void {
    if (this.arabicParagraph && this.frenchParagraph) {
      this.arabicParagraph.nativeElement.style.display = this.currentLanguage === 'arabic' ? 'block' : 'none';
      this.frenchParagraph.nativeElement.style.display = this.currentLanguage === 'french' ? 'block' : 'none';
    }
  }
*/
  private initScrollReveal(): void {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      reset: true // Ajoutez cette ligne
    };

    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__btns", {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal(".destination__card", {
      ...scrollRevealOption,
      interval: 500,
    });
    ScrollReveal().reveal(".showcase__image img", {
      ...scrollRevealOption,
      origin: "left",
    });
    ScrollReveal().reveal(".showcase__content h4", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".showcase__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".showcase__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal(".banner__card", {
      ...scrollRevealOption,
      interval: 500,
    });
    ScrollReveal().reveal(".discover__card", {
      ...scrollRevealOption,
      interval: 500,
    });
    
  }

  private initSwiper(): void {
    new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
    });
  }

  private initVideo(): void {
    if (this.headerVideo) {
      const videoElement = this.headerVideo.nativeElement;
  

      videoElement.muted = true;
      

      videoElement.play().then(() => {
        console.log("La vidéo a commencé à jouer.");
        this.isVideoPlaying = true;
      }).catch((e: any) => {
        console.log("Erreur lors de la lecture de la vidéo :", e);

        if (this.headerImage) {
          this.headerImage.nativeElement.style.display = 'block';
        }
      });
    }
  }

  private initAutoTranslate(): void {

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 3) {
        clearInterval(interval);
        return;
      }
      this.toggleLanguage();
      count++;
    }, 50);
  }

  @HostListener('window:visibilitychange', ['$event'])
  onVisibilityChange(): void {
    if (this.headerVideo) {
      if (document.hidden && this.isVideoPlaying) {
        this.headerVideo.nativeElement.pause();
      } else if (!document.hidden && this.isVideoPlaying) {
        this.headerVideo.nativeElement.play();
      }
    }
  }
}
