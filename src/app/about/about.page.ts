import { AfterViewInit, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons],
})
export class AboutPage implements AfterViewInit {
  map!: L.Map;
  lat: number = 0;
  lng: number = 0;

  constructor() {}

  async myLatLng() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15
    }).addTo(this.map);

    
    const defaultIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
    L.Marker.prototype.options.icon = defaultIcon;

    L.marker([this.lat, this.lng])
      .addTo(this.map)
      .bindPopup('Melvin\'s Location')
      .openPopup();
      L.marker([14.5995, 120.9842]) 
.addTo(this.map)

  L.marker([15.4242193, 121.1105858]) 
.addTo(this.map)
.bindPopup('Keith\'s Location')
 
 L.marker([15.511884, 120.977158]) 
.addTo(this.map)
.bindPopup('Holden\'s Location')

L.marker([15.486505, 120.973396]) 
.addTo(this.map)
.bindPopup('Lorence\'s Location')



  }

  ngAfterViewInit() {
    this.myLatLng();
  }
}