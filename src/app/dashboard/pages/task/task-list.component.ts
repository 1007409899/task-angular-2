import { AfterViewInit, Component, inject, OnInit, ViewChild, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '@app/dashboard/services/task.service';
import { responseTask } from '@app/core/interfaces/responde-task';
import { EstadoTask, Task } from '@app/dashboard/interfaces/task';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackBarService } from '@app/core/services/snackbar-service.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, NgIf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Task>();
  statesTask = EstadoTask;
  filtroEstado = signal<EstadoTask>(EstadoTask.PENDIENTE);

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  taskService = inject(TaskService)
  dialog = inject(MatDialog)
  snackbar = inject(SnackBarService);
  displayedColumns: string[] = ['id', 'title', 'description', 'isCompleted', 'acciones'];

  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks(): void {
    this.taskService.getTodos().subscribe((data) => {
      if (data) {
        this.dataSource.data = data;
      }
    });
  }
  add(): void {
    this.navegateForm(null, false);
  }
  editar(element: Task): void {
    this.navegateForm(element, true);
  }

  eliminar(element: Task): void {
    this.snackbar
      .confirmDialog('¿Estás seguro de eliminar la tarea?')
      .pipe(
        filter((result) => result),
        switchMap(() => this.taskService.deleteTask(element.id)),
        tap((data) => {
          if (data) {
            const index = this.dataSource.data.indexOf(element);
            if (index >= 0) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
              this.snackbar.notification$.next(data.message);
            }
          }
        })
      )
      .subscribe();
  }

  navegateForm(data: Task | null, isEdit: boolean): void {
    this.dialog.open(TaskFormComponent, {
      data: { task: data, isEdit }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.onEstadoChange(this.filtroEstado());
      }
    });
  }
  updateStatus(checked: boolean, task: Task): void {
    const newState = checked ? EstadoTask.COMPLETADO : EstadoTask.PENDIENTE;

    this.taskService.updateTaskStatus(task.id, newState).subscribe((data) => {
      if (data) {
        const index = this.dataSource.filteredData.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.dataSource.filteredData[index] = task;
          this.dataSource._updateChangeSubscription();
          this.snackbar.notification$.next(data.message);
        }
      }
    });
  }
  onEstadoChange(estado: EstadoTask): void {
    // preguntar si estado es difenrete a EstadoTask
    if (estado !== EstadoTask.PENDIENTE && estado !== EstadoTask.COMPLETADO) {
      this.getAllTasks();
      return;
    }
    this.filtroEstado.set(estado); // <-- Así se actualiza el signal
    this.aplicarFiltro(); // Aplicas la lógica después de actualizar el estado
  }
  aplicarFiltro(): void {
    this.taskService.filterByState(this.filtroEstado()).subscribe((data) => {
      if (data) {
        this.dataSource.data = data;
      }
    });
  }
}
