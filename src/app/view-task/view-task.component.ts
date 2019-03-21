import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskData = [];
  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig()
    .subscribe((data) => {
      this.taskData = data;
    });
  }

}
