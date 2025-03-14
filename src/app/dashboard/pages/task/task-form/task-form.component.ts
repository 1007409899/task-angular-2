import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Task } from '@app/dashboard/interfaces/task';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '@app/dashboard/services/task.service';
import { SnackBarService } from '@app/core/services/snackbar-service.service';
import { responseTask } from '@app/core/interfaces/responde-task';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule,   MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit{
  taskForm!: FormGroup;
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  snackbar = inject(SnackBarService);
  isEdit = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { task: Task; isEdit: boolean },
    private dialogRef: MatDialogRef<TaskFormComponent>
    ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [1],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCompleted: [false]
    });
    this.fillForm();
  }
  fillForm() {
    if(!this.data) return;
    this.isEdit.set(this.data.isEdit);
    if (this.data?.task) {
      this.taskForm.patchValue(this.data.task);
    }
  }
  save(): void {
    if(this.taskForm.valid){
      this.taskForm.markAllAsTouched();
    }

    const serviceTask = this.isEdit() ? this.taskService.updateTask(this.taskForm.value) : this.taskService.saveTask(this.taskForm.value);
    serviceTask.subscribe((data) => {
      if (data) {
        this.completedServiceTask(data);
      }
    }, (error) => {
      if(error){
        this.snackbar.notification$.next(error.message);
      }
    });
  }
  completedServiceTask(data: responseTask<Task>): void {
    this.snackbar.notification$.next(data.message);
    this.dialogRef.close(true);
    this.taskForm.reset();

  }


 }
