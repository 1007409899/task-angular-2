import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '@app/dashboard/services/task.service';
import { responseTask } from '@app/core/interfaces/responde-task';
import { Task } from '@app/dashboard/interfaces/task';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatCheckboxModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent  implements OnInit,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource  = new MatTableDataSource<Task>();

  ngAfterViewInit() {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  taskService = inject(TaskService)
  dialog = inject(MatDialog)
  displayedColumns: string[] = ['id', 'title', 'description', 'isCompleted', 'acciones'];

  ngOnInit() {
    this.taskService.getTodos().subscribe((data) => {
     if (data) {
       this.dataSource.data = data;
     }
    });
  }
  add(): void {
    this.navegateForm(null , false);
  }
  editar(element: any) {
    console.log('Editar:', element);
    // Aquí abre un modal, navega o carga datos en el formulario
  }

  eliminar(element: any) {
    console.log('Eliminar:', element);
    // Aquí confirmas y eliminas del array
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Refresca la tabla
    }
  }
  navegateForm(data: Task | null, isEdit: boolean): void {
    this.dialog.open(TaskFormComponent, {
      data: { task: data, isEdit }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.getTodos().subscribe((data) => {
          if (data) {
            this.dataSource.data = data;
          }
        });
      }
    });
  }
}
