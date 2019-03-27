import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import { DatePipe } from '@angular/common';
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
  statusFlag:boolean = false;
  slideValue:number = 0;
  constructor(private fb:FormBuilder,
              private configService: ConfigService,
              private sessionService: SessionService,
              private router: Router) {
                
              }
  
  onSubmit() {
    let newData = {
      TASK_ID: null,
      PARENT_ID: null,
      TASK: this.taskForm.value.task,
      START_DATE: this.taskForm.value.startDate,
      END_DATE: this.taskForm.value.endDate,
      PRIORITY: this.slideValue
    }
    this.configService.addTask(newData).subscribe((res)=>{
          this.taskForm.reset();
    });
  }

  ngOnInit() {
    this.createForm();
    if(this.sessionService.storage) {
      this.loadFormData();
      this.statusFlag = true;
    }
  }

  displayChanged(value) {
    this.slideValue = value;
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
    this.slideValue = this.sessionService.storage.PRIORITY;
  }

  onUpdate() {
    let newData = {
      TASK_ID: this.sessionService.storage.TASK_ID,
      PARENT_ID: this.sessionService.storage.PARENT_ID,
      TASK: this.taskForm.value.task,
      START_DATE: this.taskForm.value.startDate,
      END_DATE: this.taskForm.value.endDate,
      PRIORITY: this.slideValue
    }
    this.configService.updateTask(newData, this.sessionService.storage._id).subscribe(res=>{
      this.sessionService.storage = null;
      this.taskForm.reset();
      this.router.navigate(["viewTask"]);
    });
  }

  startDateHandler() {
    this.taskForm.patchValue({
      startDate:new DatePipe('en-US').transform(this.taskForm.value.startDate, 'dd/MM/yyyy')
    });
  }

  endDateHandler() {
    this.taskForm.patchValue({
      endDate:new DatePipe('en-US').transform(this.taskForm.value.endDate, 'dd/MM/yyyy')
    });
  }

  resetForm() {
    this.taskForm.reset();
    this.sessionService.storage = null;
    this.statusFlag = false;
  }
}
