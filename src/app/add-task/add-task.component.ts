import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm:FormGroup;
  sliderValue:number;
  statusFlag:boolean = false;
  constructor(private fb:FormBuilder,
              private configService: ConfigService,
              private sessionService: SessionService) {
                
              }
  
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
    console.log('task object',this.sessionService.storage);
    if(this.sessionService.storage) {
      this.loadFormData();
      this.statusFlag = true;
    }
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

  loadFormData() {
    this.taskForm.patchValue({
      task: this.sessionService.storage.TASK,
      startDate: this.sessionService.storage.START_DATE,
      endDate: this.sessionService.storage.END_DATE
    });
  }

  onUpdate() {
    let newData = {
      TASK_ID: this.sessionService.storage.TASK_ID,
      PARENT_ID: this.sessionService.storage.PARENT_ID,
      TASK: this.taskForm.value.task,
      START_DATE: this.taskForm.value.startDate,
      END_DATE: this.taskForm.value.endDate,
      PRIORITY: this.sliderValue
    }
    this.configService.updateTask(newData, this.sessionService.storage._id).subscribe(res=>{
      this.sessionService.storage = null;
    });
  }
}
