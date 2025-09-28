import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = [
    { id: 1, name: 'Melvin', course: 'BSIT', age: 19 },
    { id: 2, name: 'Holden', course: 'BSIT', age: 20 },
    { id: 3, name: 'Keith', course: 'BSIT', age: 21 },
    { id: 4, name: 'Lorence', course: 'BSIT', age: 22 }
  ];

  getStudents() {
    return this.students;
  }
}
