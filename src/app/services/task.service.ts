
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Task[]> ('http://localhost:3000/tasks');
  }
}
