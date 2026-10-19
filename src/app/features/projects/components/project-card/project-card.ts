import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList],
  template: `
    <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900">{{ project().name }}</h3>
          <p class="mt-1 text-sm text-slate-600">{{ project().description }}</p>
        </div>
        <span class="w-fit rounded-full px-3 py-1 text-xs font-semibold"
          [class.bg-emerald-100]="project().status === 'Terminé'"
          [class.text-emerald-800]="project().status === 'Terminé'"
          [class.bg-blue-100]="project().status === 'En cours'"
          [class.text-blue-800]="project().status === 'En cours'"
          [class.bg-amber-100]="project().status === 'En attente'"
          [class.text-amber-800]="project().status === 'En attente'">{{ project().status }}</span>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <h4 class="font-semibold text-slate-800">Tâches <span class="text-slate-400">({{ project().tasks.length }})</span></h4>
        <button type="button" (click)="projectSelected.emit(project())"
          class="rounded-lg border border-cyan-700 px-3 py-1.5 text-sm font-semibold text-cyan-800 hover:bg-cyan-50">Sélectionner</button>
      </div>
      <div class="mt-3">
        <app-task-list [tasks]="project().tasks" [users]="users()" />
      </div>
    </article>
  `
})
export class ProjectCard {
  project = input.required<Project>();
  users = input<User[]>([]);
  projectSelected = output<Project>();
}
