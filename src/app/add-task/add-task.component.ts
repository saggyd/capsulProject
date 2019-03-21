import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm:FormGroup;
  sliderValue:number;
  constructor(private fb:FormBuilder,private configService: ConfigService) {}
  
  onSubmit() {
    let newData = {
      TASK_ID: null,
      PARENT_ID: null,
      TASK: this.taskForm.value.task,
      START_DATE: this.taskForm.value.startDate,
      END_DATE: this.taskForm.value.endDate,
      PRIORITY: this.sliderValue
    }
    this.configService.addTask(newData).subscribe((res)=>{
          console.log("Created a customer");
    });
  }

  ngOnInit() {
    this.createForm();
  }

  displayChanged(value) {
    this.sliderValue = value;
  }

  createForm = () => {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      parentTask: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

}
