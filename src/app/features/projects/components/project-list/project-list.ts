import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { ProjectCard } from '../project-card/project-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard, EmptyState],
  template: `
    <section>
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold text-cyan-800">ESPACE PROJETS</p>
          <h2 class="mt-1 text-2xl font-bold text-slate-900">Tous les projets</h2>
          <p class="mt-1 text-sm text-slate-500">{{ filteredProjects().length }} projet(s)</p>
        </div>
        <label class="block w-full sm:max-w-sm">
          <span class="mb-1 block text-sm font-medium text-slate-700">Rechercher un projet</span>
          <input [ngModel]="searchTerm()" (ngModelChange)="searchTerm.set($event)" type="text" placeholder="Ex. application mobile..."
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
        </label>
      </div>
      @if (selectedProject(); as selected) {
        <div class="mb-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-950">
          Projet sélectionné : <strong>{{ selected.name }}</strong>
          <button class="ml-3 underline" (click)="selectedProject.set(null)">Effacer</button>
        </div>
      }
      @if (filteredProjects().length > 0) {
        <div class="grid gap-5 lg:grid-cols-2">
          @for (project of filteredProjects(); track project.id) {
            <app-project-card [project]="project" [users]="users()" (projectSelected)="onProjectSelected($event)" />
          }
        </div>
      } @else {
        <app-empty-state title="Aucun projet trouvé" message="Essayez un autre nom de projet." />
      }
    </section>
  `
})
export class ProjectList {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);
  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    return this.projects().filter(project => project.name.toLocaleLowerCase().includes(term));
  });

  constructor() {
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  onProjectSelected(project: Project): void {
    this.selectedProject.set(project);
    console.log('Projet sélectionné :', project);
  }
}
