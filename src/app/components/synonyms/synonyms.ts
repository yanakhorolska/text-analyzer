import { Component, inject, input, output, signal } from '@angular/core';
import { SynonymsService, Synonym } from '../../services/synonyms.service';

@Component({
  selector: 'app-synonyms',
  standalone: true,
  imports: [],
  templateUrl: './synonyms.html',
  styleUrl: './synonyms.css',
})
export class Synonyms {
  private readonly synonymsService = inject(SynonymsService);
  private requestId = 0;

  readonly selectedText = input('');
  readonly selectionVersion = input(0);
  readonly replace = output<string>();

  readonly synonyms = signal<Synonym[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly searchedVersion = signal(-1);

  findSynonyms(): void {
    const word = this.selectedText().trim();
    const version = this.selectionVersion();

    if (!word) return;

    const requestId = ++this.requestId;

    this.loading.set(true);
    this.error.set('');
    this.synonyms.set([]);
    this.searchedVersion.set(-1);

    this.synonymsService.getSynonyms(word).subscribe({
      next: (results) => {
        if (requestId !== this.requestId) return;

        this.loading.set(false);

        if (version !== this.selectionVersion() || word !== this.selectedText()) {
          return;
        }

        this.synonyms.set(results);
        this.searchedVersion.set(version);
      },

      error: () => {
        if (requestId !== this.requestId) return;

        this.loading.set(false);

        if (version !== this.selectionVersion()) return;

        this.error.set('Failed to load synonyms.');
        this.searchedVersion.set(version);
      },
    });
  }
}
