// Angular core imports for module functionality
import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Import local components and modules
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { Header } from './components/header/header';

// NgModule decorator - defines the root module of the Angular application
@NgModule({
  declarations: [
    App,      // Root application component
    Header    // Header navigation component (shown on every page)
  ],
  imports: [
    BrowserModule,      // Provides browser-specific functionality (DOM, async, etc.)
    AppRoutingModule,    // Root routing configuration
    FormsModule,        // Enables form directives like [(ngModel)] for two-way binding
    RouterModule        // Provides router directives like <router-outlet>
  ],
  providers: [
    // Zone-less change detection provider - improves performance by not using Zone.js
    // This requires manual change detection using ChangeDetectorRef
    provideZonelessChangeDetection(),
    
    // Global error handling provider - catches and logs application-wide errors
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]  // Marks App component as the entry point that Angular will render
})
export class AppModule { }
