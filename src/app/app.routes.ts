import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'task-list' // 👈 Esto hace la magia
      },
      {
        path: 'task-list',
        title: 'Listado de tareas',
        loadComponent: () => import('./dashboard/pages/task/task-list.component').then(m => m.TaskListComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard/task-list'
  }
];
