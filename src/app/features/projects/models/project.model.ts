import { Task, TaskStatus } from './task.model';

export type ProjectStatus = TaskStatus;
export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  tasks: Task[];
}
