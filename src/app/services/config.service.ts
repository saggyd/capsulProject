import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'http://localhost:8000/tasks';
  postConfigUrl = 'http://localhost:8000/person';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  addTask(newTask) {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this.http.post(this.postConfigUrl, newTask, options);
  }
}
