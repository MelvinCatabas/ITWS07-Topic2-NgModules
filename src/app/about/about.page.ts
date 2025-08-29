import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false //add this to remove the error when generating new page
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
