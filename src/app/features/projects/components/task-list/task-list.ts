import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    <div class="space-y-2">
      @for (task of tasks(); track task.id) {
        <article class="rounded-lg border-l-4 bg-slate-50 p-3"
          [class.border-l-emerald-500]="task.status === 'Terminé'"
          [class.border-l-blue-500]="task.status === 'En cours'"
          [class.border-l-amber-500]="task.status === 'En attente'">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="font-medium text-slate-800">{{ task.title }}</p>
              @if (showAssignee()) {
                <p class="mt-1 text-xs text-slate-500">
                  Assigné à :
                  @if (assigneeName(task.assigneeId); as name) { {{ name }} } @else { Non assignée }
                </p>
              }
            </div>
            <div class="flex flex-wrap gap-2 text-xs">
              <span class="rounded-full bg-slate-200 px-2.5 py-1 text-slate-700">{{ task.priority }}</span>
              <span class="rounded-full px-2.5 py-1"
                [class.bg-emerald-100]="task.status === 'Terminé'"
                [class.text-emerald-800]="task.status === 'Terminé'"
                [class.bg-blue-100]="task.status === 'En cours'"
                [class.text-blue-800]="task.status === 'En cours'"
                [class.bg-amber-100]="task.status === 'En attente'"
                [class.text-amber-800]="task.status === 'En attente'">{{ task.status }}</span>
            </div>
          </div>
        </article>
      } @empty {
        <p class="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Aucune tâche.</p>
      }
    </div>
  `
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input(true);
  users = input<User[]>([]);
  assigneeName(id?: number): string | undefined {
    return id === undefined ? undefined : this.users().find(user => user.id === id)?.name;
  }
}
