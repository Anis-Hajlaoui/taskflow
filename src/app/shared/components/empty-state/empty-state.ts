import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
      <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">∅</div>
      <p class="font-semibold text-slate-700">{{ title() }}</p>
      <p class="mt-1 text-sm text-slate-500">{{ message() }}</p>
    </div>
  `
})
export class EmptyState {
  title = input('Aucun résultat');
  message = input('Essayez de modifier votre recherche.');
}
