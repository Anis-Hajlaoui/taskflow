import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCard, EmptyState],
  template: `
    <section>
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold text-cyan-800">ÉQUIPE</p>
          <h2 class="mt-1 text-2xl font-bold text-slate-900">Utilisateurs</h2>
          <p class="mt-1 text-sm text-slate-500">{{ filteredUsers().length }} utilisateur(s)</p>
        </div>
        <label class="block w-full sm:max-w-sm">
          <span class="mb-1 block text-sm font-medium text-slate-700">Rechercher un utilisateur</span>
          <input [ngModel]="searchTerm()" (ngModelChange)="searchTerm.set($event)" type="text" placeholder="Nom ou e-mail..."
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
        </label>
      </div>
      @if (filteredUsers().length > 0) {
        <div class="grid gap-5 lg:grid-cols-2">
          @for (user of filteredUsers(); track user.id) {
            <app-user-card [user]="user" [projects]="projects()" />
          }
        </div>
      } @else {
        <app-empty-state title="Aucun utilisateur trouvé" message="Essayez un autre nom ou e-mail." />
      }
    </section>
  `
})
export class UserList {
  private userService = inject(UserService);
  private projectService = inject(ProjectService);
  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal('');
  filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    return this.users().filter(user =>
      user.name.toLocaleLowerCase().includes(term) ||
      user.email.toLocaleLowerCase().includes(term)
    );
  });

  constructor() {
    this.userService.getUsers().subscribe(users => this.users.set(users));
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
  }
}
