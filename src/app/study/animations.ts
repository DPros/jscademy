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
]);

export const taskStateTrigger = trigger('taskState', [
  transition(':leave', [
    style({  opacity: 1 }),
    animate('500ms ease-in', style({ opacity: 0 }))
  ]),
  transition(':enter', [
    style({  opacity: 0}),
    animate('500ms ease-out', style({ opacity: 1 }))
  ])
]);

export const structureStateTrigger = trigger('structureState', [
  transition(':leave', [
    style({  opacity: 1, height: '*' }),
    animate('300ms ease-out', style({ opacity: 0 , height: 0 }))
  ]),
  // transition(':enter', [
  //   style({  opacity: 0, height: 0}),
  //   animate('300ms ease-out', style({ opacity: 1, height: '*' }))
  // ])
]);

