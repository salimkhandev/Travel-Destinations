// Angular core imports for component functionality
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component decorator - defines this as an Angular component
@Component({
  selector: 'app-services',           // HTML tag: <app-services></app-services>
  standalone: false,                   // Using traditional NgModule
  templateUrl: './services.html',      // HTML template file
  styleUrls: ['./services.css']        // CSS styles for this component
})
export class ServicesComponent {
  // This component displays travel services
  // No logic needed - just displays UI using the services.html template
}

// Define the route for this module
const routes: Routes = [{ path: '', component: ServicesComponent }];

// NgModule decorator - configures this lazy-loaded feature module
@NgModule({
  declarations: [ServicesComponent],              // Register the component
  imports: [
    CommonModule,                                // Provides *ngIf, pipes, etc.
    RouterModule.forChild(routes)                // Child routing configuration
  ]
})
export class ServicesModule { }

