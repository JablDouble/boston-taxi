import { Injectable } from '@angular/core';
import * as converter from 'number-to-words';

@Injectable({
  providedIn: 'root',
})
export class FormatterService {
  numberToWords(digital: number) {
    return converter.toWordsOrdinal(digital);
  }
}
