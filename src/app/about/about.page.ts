import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButtons,
  AlertController
} from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation, Position } from '@capacitor/geolocation';

// Import leaflet marker slideTo plugin
import 'leaflet.marker.slideto';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons],
})
export class AboutPage implements AfterViewInit, OnDestroy {
  map!: L.Map;
  lat: number = 0;
  lng: number = 0;
  watchId: string | null = null;

  userMarker!: L.Marker & {
    slideTo: (latlng: L.LatLngExpression, options: { duration: number; keepAtCenter?: boolean }) => void;
  };

  path: L.LatLng[] = [];
  polyline!: L.Polyline;
  totalDistance: number = 0;

  constructor(private alertController: AlertController) {}

  async ngAfterViewInit() {
    // Start tracking once view is ready
    this.startTracking();
  }

  async initMap(lat: number, lng: number) {
    if (!this.map) {
      // Initialize map
      this.map = L.map('map').setView([lat, lng], 18);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);

      const defaultIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      });
      L.Marker.prototype.options.icon = defaultIcon;

      // Create initial marker
      this.userMarker = L.marker([lat, lng]) as any;
      this.userMarker.addTo(this.map).bindPopup("You're here").openPopup();

      // Initialize path and polyline
      this.path = [L.latLng(lat, lng)];
      this.polyline = L.polyline(this.path, { color: 'blue' }).addTo(this.map);
    } else {
      // Update location if map already initialized
      this.updateUserLocation(lat, lng);
    }
  }

  updateUserLocation(lat: number, lng: number) {
    const newPoint = L.latLng(lat, lng);

    // Animate marker movement
    if (this.userMarker && typeof this.userMarker.slideTo === 'function') {
      this.userMarker.slideTo(newPoint, { duration: 1000 });
    } else {
      this.userMarker.setLatLng(newPoint);
    }

    // Calculate distance from last point
    const lastPoint = this.path[this.path.length - 1];
    const distance = lastPoint.distanceTo(newPoint);
    const MIN_MOVE_DISTANCE = 1; // minimum move to register path

    if (distance >= MIN_MOVE_DISTANCE) {
      this.totalDistance += distance;
      this.path.push(newPoint);
      this.polyline.setLatLngs(this.path);
    }

    // Update popup text
    this.userMarker.bindPopup(
      `You're here<br>Total Distance: ${this.totalDistance.toFixed(2)} m`
    );

    // Keep map centered on user
    this.map.setView(newPoint, this.map.getZoom());
  }

  async startTracking() {
    try {
      // Get initial accurate position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      });

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      await this.initMap(this.lat, this.lng);

      // Continuous watching of position
      this.watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
        (position: Position | null, err) => {
          if (position && position.coords) {
            const newLat = position.coords.latitude;
            const newLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            console.log(`New position: ${newLat}, ${newLng} (Accuracy: ${accuracy}m)`);

            // Only update if GPS accuracy is within 20 meters
            if (accuracy && accuracy <= 20) {
              this.updateUserLocation(newLat, newLng);
            } else {
              console.warn('Ignored inaccurate GPS reading');
            }
          } else if (err) {
            console.error('Error watching position:', err);
            this.showLocationAlert();
          }
        }
      );
    } catch (error) {
      console.error('Error starting tracking:', error);
      this.showLocationAlert();
    }
  }

  async showLocationAlert() {
    const alert = await this.alertController.create({
      header: 'Location Disabled',
      message: 'Please enable location services to use the tracker.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnDestroy() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
}
