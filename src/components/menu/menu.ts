import { Component,  Input } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() name: string;

  constructor() {
    console.log('Hello MenuComponent Component');
    this.name = 'Hello World';
  }

}
