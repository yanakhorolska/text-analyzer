import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Synonym {
  word: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class SynonymsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.datamuse.com/words';

  getSynonyms(word: string) {
    const params = new HttpParams().set('rel_syn', word).set('max', '10');

    return this.http.get<Synonym[]>(this.apiUrl, { params });
  }
}
