import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() slideValue;
  @Output() valueChange = new EventEmitter();

  constructor() {
    
   }

  changeHandler(value: number): void {
    this.valueChange.emit(value);
  }
  
  ngOnInit() {
    this.value = this.slideValue;
  }

}
