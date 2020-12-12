import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
import { expand, flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [expand(), flyInOut()],
})
export class TasksComponent implements OnInit {
  public tasks: Task[];

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    // private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (res) => {
        this.tasks = res.tasks;
      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
      }
    );
  }

  changeState(task: Task) {
    this.taskService.changeState(task).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
      }
    );
  }

  deleteTask(task: Task) {
    Swal.fire({
      title: 'Eliminar tarea',
      text: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task).subscribe(
          (res) => {
            this.toastr.success(`${res.message}`, 'Mensaje');
            this.getTasks();
          },
          (err) => {
            console.log(err);

            const message = err.error.message || err.statusText;
            this.toastr.error(`${message}`, 'Alerta');
          }
        );
      }
    });
  }
}
