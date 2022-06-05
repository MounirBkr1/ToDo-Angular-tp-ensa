
import { Component, OnInit } from '@angular/core';
import{TaskService} from"../../services/task.service";
import{Task} from 'src/app/models/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  editForm=false;
  showForm=false;

  myTask:Task ={
    label:'',
    completed:false
  }
  tasks:Task[]=[];
  resultsTasks:Task[]=[];
   searchText: string='';

  editTask(task:any){
    this.myTask=task;
    this.editForm=true;
  }
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks();

  }



  deleteTask(id:any){
    this.taskService.delete(id)
      .subscribe(()=>{
      this.tasks=this.tasks.filter(task=>task.id!=id);
      this.getTasks();
    });

  }

  persistTask(){
    this.taskService.persist(this.myTask)
      .subscribe((task:Task)=>{
      this.tasks=[task,...this.tasks];
      this.restTask();
      this.showForm=false;
        this.getTasks();
    });

  }

  updateTask() {
    this.taskService.update(this.myTask)
      .subscribe(task =>{
        this.restTask(),
          this.editForm=false
      })
  }

  restTask(){
    this.myTask={
      label:'',
      completed:false
    }
  }

  toggleCompleted(task:any){
    this.taskService.completed(task.id,task.completed)
      .subscribe(()=>{
      task.completed=!task.completed
    })
  }


  searchTasks(){
    this.resultsTasks = this.tasks.filter((task)=>
    task.label.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))
  }

  getTasks(){
    this.taskService.findAll().subscribe(tasks =>
      this.resultsTasks = this.tasks = tasks);
  }

}
