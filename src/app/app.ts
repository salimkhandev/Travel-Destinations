import { Component, signal } from '@angular/core';

// Root component decorator - the main app component
@Component({
  selector: 'app-root',         // The HTML tag where Angular app is mounted: <app-root></app-root>
  templateUrl: './app.html',     // HTML template file
  standalone: false,            // Using traditional NgModule approach
  styleUrl: './app.css'         // CSS styles for the root component
})
export class App {
  // App title stored as a signal (Angular's reactive primitive for zone-less apps)
  // The 'protected readonly' prevents external modifications and ensures it's immutable
  protected readonly title = signal('travel-destinations');
  
  // Note: This title can be used in the template if needed
  // Signal provides reactive updates without Zone.js for better performance
}
