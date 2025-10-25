// Angular core imports for component functionality
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../../services/data';

// Component decorator - defines this as an Angular component
@Component({
  selector: 'app-home',              // HTML tag: <app-home></app-home>
  standalone: false,                  // Using traditional NgModule (not standalone component)
  templateUrl: './home.html',        // HTML template file location
  styleUrls: ['./home.css']            // CSS style files for this component
})
export class HomeComponent implements OnInit {
  // Default place to search when component loads
  place = 'karachi';
  
  // Stores the travel data received from API (attractions & images)
  data: any = null;
  
  // Loading flag to show/hide loading indicator while fetching data
  loading = false;

  // Dependency injection: Angular injects DataService and ChangeDetectorRef
  // - DataService: Fetches travel data from external APIs
  // - ChangeDetectorRef: Manually triggers Angular's change detection (needed for zone-less mode)
  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  // Lifecycle hook: Called once when component is initialized
  // Automatically searches for the default place ('karachi') when page loads
  ngOnInit() {
    this.getTravelData(this.place);
  }

  // Asynchronous method to fetch travel data for a given place
  async getTravelData(placeName: string) {
    // Step 1: Set loading state to true and clear previous data
    this.loading = true;
    this.data = null;
    
    // Step 2: Manually trigger change detection to update UI immediately (shows loading spinner)
    this.cdr.detectChanges();
    
    try {
      // Step 3: Call the service to fetch data from external APIs (Geoapify + Pexels)
      // This is an async operation, so we await the result
      this.data = await this.dataService.getTravelData(placeName);
    } finally {
      // Step 4: Always execute this block - set loading to false regardless of success/failure
      this.loading = false;
      
      // Step 5: Trigger change detection again to update UI with new data
      this.cdr.detectChanges();
    }
  }

  // Event handler for the search form submission
  handleSearch(event: Event) {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();
    
    // Only search if the input is not empty (after trimming whitespace)
    if (this.place.trim()) {
      // Call the method to fetch data for the entered place
      this.getTravelData(this.place);
    }
  }

  // Angular trackBy function for *ngFor loop optimization
  // Helps Angular identify unique items in a list to prevent unnecessary re-renders
  // Returns a unique identifier for each image (either image ID or array index)
  trackByImgId(index: number, img: any): any {
    return img.id || index;
  }

  // Callback function executed when an image finishes loading
  // In zone-less mode, we need to manually trigger change detection after images load
  imageLoaded() {
    this.cdr.detectChanges();
  }
}

// Define the route for this module (empty path = home page)
const routes: Routes = [{ path: '', component: HomeComponent }];

// NgModule decorator - configures this lazy-loaded feature module
@NgModule({
  declarations: [HomeComponent],                    // Register the component
  imports: [
    CommonModule,                                  // Provides *ngIf, *ngFor, etc.
    FormsModule,                                   // Provides [(ngModel)] two-way binding
    RouterModule.forChild(routes)                  // Child routing for lazy loading
  ]
})
export class HomeModule { }
