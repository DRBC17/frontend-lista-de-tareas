import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  animations: [expand()]
})
export class ViewTaskComponent implements OnInit {

  viewTaskForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.loadTask();
  }

  loadTask() {

    const id = this.activatedRoute.snapshot.params.id;
    this.taskService.getTask(id).subscribe(
      (res) => {

        const task = res;
        this.viewTaskForm.patchValue({
          title: task.title,
          description: task.description
        })


      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/tasks']);
      }
    );
  }

  private buildForm() {
    this.viewTaskForm = this.formBuilder.group({
      title: [{ value: '', disabled: true },],
      description: [{ value: '', disabled: true },],
    });
  }


}
