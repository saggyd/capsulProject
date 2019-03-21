import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm:FormGroup;

  constructor(private fb:FormBuilder) {}
  
  onSubmit() {
    console.log(this.taskForm.value);
  }

  ngOnInit() {
    this.createForm();
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
