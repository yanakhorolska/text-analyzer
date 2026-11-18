import { Component, signal, computed } from '@angular/core';
import { Synonyms } from './components/synonyms/synonyms';

@Component({
  selector: 'app-root',
  imports: [Synonyms],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  text = signal('');
  selectedText = signal('');
  selectionVersion = signal(0);

  selectionStart = 0;
  selectionEnd = 0;

  characterCount = computed(() => this.text().length);

  wordCount = computed(() => {
    const value = this.text().trim();
    return value ? value.split(/\s+/).length : 0;
  });

  onTextInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    this.text.set(textarea.value);
    this.resetSelection();
  }

  onTextSelect(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.slice(start, end).trim();

    if (
      start === this.selectionStart &&
      end === this.selectionEnd &&
      selected === this.selectedText()
    ) {
      return;
    }

    this.selectionStart = start;
    this.selectionEnd = end;
    this.selectedText.set(selected);

    this.selectionVersion.update((version) => version + 1);
  }

  replaceSelectedText(newWord: string): void {
    const currentText = this.text();

    const selected = currentText.slice(this.selectionStart, this.selectionEnd);

    if (!this.selectedText() || selected.trim() !== this.selectedText()) {
      return;
    }

    const leadingSpace = selected.match(/^\s*/)?.[0] ?? '';
    const trailingSpace = selected.match(/\s*$/)?.[0] ?? '';

    const before = currentText.slice(0, this.selectionStart);
    const after = currentText.slice(this.selectionEnd);

    this.text.set(before + leadingSpace + newWord + trailingSpace + after);

    this.resetSelection();
  }

  clearText(): void {
    this.text.set('');
    this.resetSelection();
  }

  async copyText(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.text());
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }

  private resetSelection(): void {
    this.selectedText.set('');
    this.selectionStart = 0;
    this.selectionEnd = 0;
    this.selectionVersion.update((version) => version + 1);
  }
}
