import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  public volume = 20;
  sliderControl: FormControl = new FormControl(10);
  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  @Output() valueChange = new EventEmitter();

  constructor() {
    
   }

  changeHandler(value: number): void {
    console.log(value);
    this.valueChange.emit(value);
  }
  
  ngOnInit() {
  }

}
