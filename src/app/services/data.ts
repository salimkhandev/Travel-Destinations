import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// Injectable decorator marks this as a service that can be injected
@Injectable({
  providedIn: 'root'  // Makes this service available throughout the entire app (singleton)
})
export class DataService {
  // API keys are loaded from environment configuration
  // - Local: Uses environment.ts/environment.prod.ts files
  // - Vercel: Environment variables are injected during build via vercel.json
  private readonly GEOAPIFY_KEY = environment.geoapifyApiKey;
  private readonly PEXELS_KEY = environment.pexelsApiKey;

  /**
   * Main method to fetch travel data for a given place name
   * @param placeName - The name of the place to search for (e.g., "Tokyo", "Paris")
   * @returns Object containing place name, attractions array, and images array
   */
  async getTravelData(placeName: string) {
    try {
      console.log(`🔍 Searching for place: "${placeName}"`);
      
      // ========== STEP 1: GET COORDINATES (Geocoding) ==========
      // Use Geoapify to convert place name to latitude/longitude coordinates
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(placeName)}&apiKey=${this.GEOAPIFY_KEY}`;
      const geoCodeRes = await fetch(geoUrl);
      const geoData: any = await geoCodeRes.json();
      
      console.log(`📍 Geoapify geocode response:`, geoData);
      
      // Validation: Check if the API returned any location results
      if (!geoData.features || geoData.features.length === 0) {
        console.error(`❌ No location found for "${placeName}"`);
        throw new Error('No location found');
      }
      
      // Extract longitude and latitude from the first result
      // GeoJSON format: [longitude, latitude]
      const [lon, lat] = geoData.features[0].geometry?.coordinates || [];
      console.log(`📍 Found coordinates - Lon: ${lon}, Lat: ${lat}`);
      
      // Validation: Ensure we have valid coordinates
      if (!lon || !lat) {
        throw new Error('Invalid coordinates');
      }

      // ========== STEP 2 & 3: FETCH ATTRACTIONS AND PHOTOS IN PARALLEL ==========
      // Build the Geoapify Places API URL
      // - categories=tourism.attraction: Only tourist attractions
      // - filter=circle: Search within 5km radius of the coordinates
      // - limit=5: Maximum 5 attractions
      const attractionUrl = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&limit=5&apiKey=${this.GEOAPIFY_KEY}`;
      console.log(`🏛️ Fetching attractions from:`, attractionUrl);
      
      // Promise.all() runs both API calls SIMULTANEOUSLY for better performance
      // This reduces total wait time compared to calling them sequentially
      const [attractionRes, imgRes] = await Promise.all([
        fetch(attractionUrl),  // Fetch attractions from Geoapify
        fetch(`https://api.pexels.com/v1/search?query=${placeName}&per_page=5`, {
          headers: { Authorization: this.PEXELS_KEY }  // Pexels requires API key in header
        })  // Fetch photos from Pexels
      ]);

      // Parse both JSON responses in parallel (also done simultaneously)
      const [attractionData, imgData] = await Promise.all([
        attractionRes.json(),
        imgRes.json()
      ]);

      // Log the results for debugging
      console.log(`🏛️ Attractions API response:`, attractionData);
      console.log(`📊 Found ${attractionData.features?.length || 0} attractions`);
      
      // Log attraction names if found
      if (attractionData.features && attractionData.features.length > 0) {
        console.log(`✅ Attractions:`, attractionData.features.map((f: any) => f.properties.name));
      } else {
        console.warn(`⚠️ No attractions found for "${placeName}"`);
      }

      // ========== RETURN COMBINED DATA ==========
      // Return an object with place name, attractions array, and images array
      // Use || [] to provide empty arrays if API returns null/undefined
      return {
        place: placeName,
        attractions: attractionData.features || [],
        images: imgData.photos || []
      };
    } catch (err) {
      // Error handling: Log the error and re-throw it so the component can handle it
      console.error('❌ Error fetching travel data:', err);
      throw err;
    }
  }
}
