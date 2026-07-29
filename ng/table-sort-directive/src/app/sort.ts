import { computed, Directive, output, signal } from '@angular/core';
import type { SortHeader } from './sort-header'

type Sortable = {
  key: string
}

@Directive({ selector: '[tnb-sort]' })
export class TNBSort {

  active = signal<undefined | string>(undefined)
  direction = signal<undefined | 'asc' | 'desc'>(undefined)
  sortChange = output<{ active: string, direction: string }>()

  sortables = new Map<string, SortHeader>();

  register(key: string, sortable: SortHeader) {

    this.sortables.set(key, sortable);
    console.log({ sortable: JSON.stringify(this.sortables) })
  }


  sort(sortable: SortHeader) {
    if(this.active() !== sortable.key()) {
      this.active.set(sortable.key())

      const _dir = sortable.initOrder() ? sortable.initOrder() : 'asc'
      this.direction.set(_dir)
    }

    const nextDir = this.direction() === 'asc' ? 'desc' : 'asc'; 
    this.direction.set(nextDir)

    this.sortChange.emit({
      active: this.active() as string,
      direction: this.direction() as string
    })

    console.log({ active: this.active() })

  }


}
