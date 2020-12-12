import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { expand, flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  animations: [expand(), flyInOut()],
})
export class CreateTaskComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void { }

  private buildForm() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(formValue: Task) {
    this.taskService.createTask(formValue).subscribe(
      (res) => {
        this.toastr.success(`${res.message}`, 'Mensaje');
        this.router.navigate(['/tasks']);
      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/tasks']);
      }
    );
  }

}
