import { Component, input, output } from '@angular/core';

export type AppView = 'projects' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  template: `
    <div class="inline-flex rounded-xl bg-slate-800 p-1" aria-label="Choisir la vue">
      <button type="button" (click)="viewChange.emit('projects')"
        class="rounded-lg px-4 py-2 text-sm font-semibold transition"
        [class.bg-cyan-400]="activeView() === 'projects'"
        [class.text-slate-950]="activeView() === 'projects'"
        [class.text-slate-200]="activeView() !== 'projects'">Par tâche</button>
      <button type="button" (click)="viewChange.emit('users')"
        class="rounded-lg px-4 py-2 text-sm font-semibold transition"
        [class.bg-cyan-400]="activeView() === 'users'"
        [class.text-slate-950]="activeView() === 'users'"
        [class.text-slate-200]="activeView() !== 'users'">Par user</button>
    </div>
  `
})
export class ViewToggle {
  activeView = input.required<AppView>();
  viewChange = output<AppView>();
}
