import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'   
})
export class GeolocationService {
  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }
}
