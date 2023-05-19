import { animate, animation, sequence, style } from '@angular/animations';

// export const flashAnimation = animation([
//   sequence([
//     animate('250ms', style({
//       'background-color': 'rgb(201, 157, 242)'
//     })),
//     animate('250ms', style({
//       'background-color': 'white'
//     })),
//   ]),
// ])
export const flashAnimation = animation([
  sequence([
    animate('{{ time }}', style({
      'background-color': '{{ flashColor }}'
    })),
    animate('{{ time }}', style({
      'background-color': 'white'
    })),
  ]),
])