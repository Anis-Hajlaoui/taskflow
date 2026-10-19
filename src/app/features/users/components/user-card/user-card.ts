import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UserProjectGroup, EmptyState],
  template: `
    <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-900">
            {{ initials() }}
          </div>
          <div>
            <h3 class="font-bold text-slate-900">{{ user().name }}</h3>
            <p class="text-sm text-slate-500">{{ user().email }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ user().role }}</p>
          </div>
        </div>
        <span class="rounded-full px-3 py-1 text-xs font-semibold"
          [class.bg-emerald-100]="user().active" [class.text-emerald-800]="user().active"
          [class.bg-slate-200]="!user().active" [class.text-slate-700]="!user().active">
          {{ user().active ? 'Actif' : 'Inactif' }}
        </span>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-2">
        <div class="rounded-xl bg-amber-50 p-3 text-center">
          <p class="text-xl font-bold text-amber-800">{{ todoCount() }}</p><p class="text-xs text-amber-800">À faire</p>
        </div>
        <div class="rounded-xl bg-blue-50 p-3 text-center">
          <p class="text-xl font-bold text-blue-800">{{ doingCount() }}</p><p class="text-xs text-blue-800">En cours</p>
        </div>
        <div class="rounded-xl bg-emerald-50 p-3 text-center">
          <p class="text-xl font-bold text-emerald-800">{{ doneCount() }}</p><p class="text-xs text-emerald-800">Terminées</p>
        </div>
      </div>

      <div class="mt-5">
        <h4 class="mb-3 font-semibold text-slate-800">Tâches assignées</h4>
        @if (userTasks().length > 0) {
          <div class="space-y-3">
            @for (group of projectGroups(); track group.project.id) {
              <app-user-project-group [project]="group.project" [tasks]="group.tasks" />
            }
          </div>
        } @else {
          <app-empty-state title="Aucune tâche assignée" message="Cet utilisateur n'a pas encore de tâche." />
        }
      </div>
    </article>
  `
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  userTasks = computed(() => this.projects().flatMap(project =>
    project.tasks.filter(task => task.assigneeId === this.user().id)
  ));
  todoCount = computed(() => this.userTasks().filter(task => task.status === 'En attente').length);
  doingCount = computed(() => this.userTasks().filter(task => task.status === 'En cours').length);
  doneCount = computed(() => this.userTasks().filter(task => task.status === 'Terminé').length);
  projectGroups = computed(() => this.projects()
    .map(project => ({
      project,
      tasks: project.tasks.filter(task => task.assigneeId === this.user().id)
    }))
    .filter(group => group.tasks.length > 0));
  initials(): string {
    return this.user().name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
  }
}
