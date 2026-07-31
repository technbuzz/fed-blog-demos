import { computed, Directive, output, signal } from '@angular/core';
import type { TNBSortHeader } from './tnb-sort-header'

@Directive({ selector: '[tnb-sort]' })
export class TNBSort {

  active = signal<undefined | string>(undefined)
  direction = signal<'asc' | 'desc'>('asc')

  sortChange = output<{ active: string, direction: string }>()

  sortables = new Map<string, TNBSortHeader>();

  register(key: string, sortable: TNBSortHeader) {

    this.sortables.set(key, sortable);
    console.log({ sortable: JSON.stringify(this.sortables) })
  }


  sort(sortable: TNBSortHeader) {
    if(this.active() !== sortable.key()) {
      this.active.set(sortable.key())

      const _dir = sortable.initOrder() ?? 'asc'
      this.direction.set(_dir)
    } else {
      const nextDir = this.direction() === 'asc' ? 'desc' : 'asc'; 
      this.direction.set(nextDir)
    }


    this.sortChange.emit({
      active: this.active() as string,
      direction: this.direction() as string
    })

    console.log({ active: this.active() })

  }


}
