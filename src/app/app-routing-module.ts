import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define the application routes
const routes: Routes = [
  // Home route (empty path) - uses lazy loading for better initial load performance
  { path: '', loadChildren: () => import('./pages/home/home').then(m => m.HomeModule) },
  
  // Services route - uses lazy loading
  { path: 'services', loadChildren: () => import('./pages/services/services').then(m => m.ServicesModule) },
  
  // Contact route - also uses lazy loading
  { path: 'contact', loadChildren: () => import('./pages/contact/contact').then(m => m.ContactModule) },
  
  // Catch-all route - redirects any unmatched URLs to home page (404 handling)
  // The '**' wildcard matches any path that wasn't matched by previous routes
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

// Routing module configuration
@NgModule({
  // forRoot() configures the root-level router with the route definitions
  imports: [RouterModule.forRoot(routes)],
  
  // Export RouterModule so other modules can use router directives
  exports: [RouterModule],
})
export class AppRoutingModule { }
