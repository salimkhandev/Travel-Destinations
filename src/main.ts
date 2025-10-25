// Import platform browser utilities and the root module
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

// Bootstrap the Angular application
// This is the entry point that starts the entire Angular application
platformBrowser()  // Creates a platform for running the app in a browser
  .bootstrapModule(AppModule, {
    // Configuration options can be passed here
    // Currently empty, but could include things like error handling, etc.
  })
  // Error handling: Catch and log any errors during application bootstrap
  .catch(err => console.error(err));
