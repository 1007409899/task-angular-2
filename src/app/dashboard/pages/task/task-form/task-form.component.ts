import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EstadoTask, Task } from '@app/dashboard/interfaces/task';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '@app/dashboard/services/task.service';
import { SnackBarService } from '@app/core/services/snackbar-service.service';
import { responseTask } from '@app/core/interfaces/responde-task';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatErrorsGenericComponent } from '@app/core/components/mat-errors-generic/mat-errors-generic.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSnackBarModule, MatErrorsGenericComponent],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  snackbar = inject(SnackBarService);
  isEdit = signal(false);
  statesTask = EstadoTask;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { task: Task; isEdit: boolean },
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {

  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [1],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      State: [this.statesTask.PENDIENTE,[]],
    });
    this.fillForm();
  }

  fillForm() {
    if (!this.data) return;
    this.isEdit.set(this.data.isEdit);
    if (!this.data?.task) return;
    if (this.data.task.state === this.statesTask.COMPLETADO) {
      this.taskForm.get('State')!.setValue(this.statesTask.COMPLETADO);
    }else{
      this.taskForm.get('State')!.setValue(false);
    }

    this.taskForm.patchValue(this.data.task);

  }
  onStateChange(checked: boolean): void {
    const newState = checked ? this.statesTask.COMPLETADO : this.statesTask.PENDIENTE;
    this.taskForm.get('State')!.setValue(newState);
  }
  save(): void {
    if (this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
    }

    const serviceTask = this.isEdit() ? this.taskService.updateTask(this.taskForm.value) : this.taskService.saveTask(this.taskForm.value);
    serviceTask.subscribe((data) => {
      if (data) {
        this.completedServiceTask(data);
      }
    }, (error) => {
      if (error) {
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
