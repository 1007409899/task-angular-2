export interface Task {
  id: number;
  title: string;
  description: string;
  state: EstadoTask;
}

// create enum
export enum EstadoTask {
  PENDIENTE = 'pendiente',
  COMPLETADO = 'completado'
}
