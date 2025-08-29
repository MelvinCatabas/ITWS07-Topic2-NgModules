import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonicModule] // add this to use Ionic components like ion-card, ion-button, etc.
})
export class CardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
