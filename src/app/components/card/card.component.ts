import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ student.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        Course: {{ student.course }} <br />
        Age: {{ student.age }} <br />
     
      </ion-card-content>
    </ion-card>
  `
})
export class CardComponent {
  @Input() student: any;
}
