import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Listado de tareas',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        title: 'Listado de tareas',
        path: 'task-list',
        loadComponent: () => import('./dashboard/pages/task/task-list.component').then(m => m.TaskListComponent),
      }
      /* {
        title: 'Agregar tarea',
        path: '',
        loadComponent: () => import('./dashboard/components/add-task/add-task.component').then(m => m.AddTaskComponent),
      } */
    ]
  },


  {
    path: '**',
    redirectTo: '/dashboard',
  }
];
