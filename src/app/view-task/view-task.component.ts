import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { SessionService } from '../services/session.service';
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskData = [];
  constructor(private configService: ConfigService, 
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.configService.getConfig()
    .subscribe((data:any) => {
      this.taskData = data;
    });
  }

  updateHandler(event,updatedVal) {
    console.log(updatedVal);
    this.sessionService.storage = updatedVal;
    this.router.navigate(["addTask"]);
  }

}
