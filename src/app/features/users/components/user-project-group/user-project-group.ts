import { Component, input } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [TaskList],
  template: `
    <section class="rounded-xl border border-slate-200 p-3">
      <div class="mb-3 flex items-center justify-between gap-2">
        <h5 class="text-sm font-semibold text-slate-800">{{ project().name }}</h5>
        <span class="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{{ tasks().length }} tâche(s)</span>
      </div>
      <app-task-list [tasks]="tasks()" [showAssignee]="false" />
    </section>
  `
})
export class UserProjectGroup {
  project = input.required<Project>();
  tasks = input.required<Task[]>();
}
