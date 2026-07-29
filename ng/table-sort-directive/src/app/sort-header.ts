import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { TNBSort } from './sort';

@Component({
  selector: '[sort-header]',
  templateUrl: 'sort-header.html',
  host: {
    '(click)': '_toggleSort()',
  }
})

export class SortHeader {

  key = input('', {
    alias: 'sort-header'
  });

  initOrder = input<'asc' | 'desc'>();

  sort = signal('');
  order = signal('asc');

  amSorted = computed(() => this._sort?.active() === this.key())

  _sort = inject(TNBSort, { optional: true})

  #effectsortHeader = effect(() => {
    console.log("sortHeader", this.key())
  })

  constructor() {
    if(!this._sort) {
      throw Error('SortHeader requires a parent Sort')
    }
  }

  ngOnInit() {
    this._sort?.register(this.key(), this)
  }

  _toggleSort() {
    this._sort?.sort(this)
  }
}
