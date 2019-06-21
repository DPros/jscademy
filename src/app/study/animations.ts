import {animate, style, transition, trigger} from '@angular/animations';

export const activeTaskStateTrigger = trigger('activeTaskState', [
  transition('* => void', [
    style({ height: '!', opacity: 1, transform: 'translateX(0)' }),
    animate('500ms ease-in', style({ height: 0, opacity: 0, transform: 'translateX(100%)' }))
  ]),
  transition('void => *', [
    style({ height: 0, opacity: 0, transform: 'translateX(100%)'}),
    animate('500ms ease-out', style({ height: '!', opacity: 1, transform: 'translateX(0)' }))
  ])
])
