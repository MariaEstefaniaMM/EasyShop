import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() name: string;
  myInput:string;
  @Output() returnFromComp: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    console.log('Hello MenuComponent Component');
    this.name = 'Hello World';
  }

  onInput(){
    this.returnFromComp.emit(this.myInput);
  }
}
