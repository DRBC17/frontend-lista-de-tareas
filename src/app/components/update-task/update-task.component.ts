import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { expand, flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  animations: [expand(), flyInOut()],
})
export class UpdateTaskComponent implements OnInit {

  updateForm: FormGroup;
  private task: Task;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.loadTask();
  }

  loadTask() {

    // console.log(this.activatedRoute.snapshot.params.id);

    const id = this.activatedRoute.snapshot.params.id;
    this.taskService.getTask(id).subscribe(
      (res) => {

        this.task = res;


      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/tasks']);
      }
    );
  }

  private buildForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(formValue: Task) {
    this.taskService.updateTask(formValue).subscribe(
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
