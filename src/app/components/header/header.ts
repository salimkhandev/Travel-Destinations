import { Component, HostListener } from '@angular/core';

// Component decorator - defines this as an Angular component
@Component({
  selector: 'app-header',           // HTML tag: <app-header></app-header>
  standalone: false,                 // Traditional NgModule approach (not standalone)
  templateUrl: './header.html',     // HTML template file location
  styleUrl: './header.css',         // CSS style file for this component
})
export class Header {
  // Mobile menu state
  isMobileMenuOpen = false;

  // Toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Close mobile menu when clicking outside or on window resize
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
}
