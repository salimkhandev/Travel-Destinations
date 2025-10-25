// Angular core imports for component functionality
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Component decorator - defines this as an Angular component
@Component({
  selector: 'app-contact',           // HTML tag: <app-contact></app-contact>
  standalone: false,                 // Using traditional NgModule
  templateUrl: './contact.html',     // HTML template file
  styleUrls: ['./contact.css']       // CSS styles for this component
})
export class ContactComponent {
  // Form field values initialized as empty strings
  name = '';          // User's full name
  email = '';         // User's email address
  message = '';       // User's message/inquiry
  
  // Flag to track if the form has been submitted
  submitted = false;

  // Method called when user submits the contact form
  submitForm() {
    // Basic validation: Check if all required fields are filled in
    if (this.name && this.email && this.message) {
      // If validation passes, set submitted to true
      // This will hide the form and show the thank-you message (handled in template)
      this.submitted = true;
    }
    // Note: In a real application, this would typically send data to a backend server
  }
}

// Define the route for this module
const routes: Routes = [{ path: '', component: ContactComponent }];

// NgModule decorator - configures this lazy-loaded feature module
@NgModule({
  declarations: [ContactComponent],              // Register the component
  imports: [
    CommonModule,                                // Provides *ngIf, pipes, etc.
    FormsModule,                                 // Enables [(ngModel)] two-way binding
    RouterModule.forChild(routes)                // Child routing configuration
  ]
})
export class ContactModule { }
