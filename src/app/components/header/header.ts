import { Component } from '@angular/core';

// Component decorator - defines this as an Angular component
@Component({
  selector: 'app-header',           // HTML tag: <app-header></app-header>
  standalone: false,                 // Traditional NgModule approach (not standalone)
  templateUrl: './header.html',     // HTML template file location
  styleUrl: './header.css',         // CSS style file for this component
})
export class Header {
  // This component serves as a navigation bar
  // Contains navigation links defined in the header.html template
  // No logic needed - just displays navigation links using router links
}
