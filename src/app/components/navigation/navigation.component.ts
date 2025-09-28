import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-menu contentId="main-content" side="start">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>S</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item *ngFor="let student  students">
            {{ student.name }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `
})
export class NavigationComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }
}
