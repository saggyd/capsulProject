import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { SessionService } from '../services/session.service';
import {Router, NavigationExtras} from "@angular/router";
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskData = [];
  searchForm:FormGroup;
  private myDatePickerOptions = {
        dateFormat: 'd.m.yyyy',
        height: '34px',
        width: '210px',
        inline: false
    };

  constructor(private configService: ConfigService, 
              private sessionService: SessionService,
              private router: Router,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.loadInitialData();
  }

  createForm = () => {
    this.searchForm = this.fb.group({
      task: [''],
      ptask: [''],
      pfrom: [''],
      pto: [''],
      sdate: [''],
      edate: ['']
    });
  }

  loadInitialData() {
    this.configService.getConfig()
    .subscribe((data:any) => {
      this.taskData = data;
    });
  }

  updateHandler(event,updatedVal) {
    this.sessionService.storage = updatedVal;
    this.router.navigate(["addTask"]);
  }

  deleteHandler(id) {
    this.configService.deleteTask(id).subscribe((data:any) => {
      this.loadInitialData();
    });
  }

  onInputFieldChanged(event) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  }

}
