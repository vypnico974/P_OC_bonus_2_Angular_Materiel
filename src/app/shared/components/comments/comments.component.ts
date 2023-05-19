import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, query, group, stagger,animateChild } //sequence
 from '@angular/animations'; 
 import { flashAnimation } from '../../animations/flash.animation';
 import { useAnimation } from '@angular/animations';
 import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
          query('@listItem', [
              stagger(500, [
                  animateChild()
              ])
          ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      // transition('void => *', [   // 'void => *'  son raccourci ':enter'
      //   style({
      //       transform: 'translateX(-100%)',
      //       opacity: 0,
      //       'background-color': 'rgb(201, 157, 242)',
      //   }),
      //   animate('250ms ease-out', style({
      //       transform: 'translateX(0)',
      //       opacity: 1,
      //       'background-color': 'white',
      //   }))
      // ])
      // transition(':enter', [
      //   style({
      //       transform: 'translateX(-100%)',
      //       opacity: 0,
      //       'background-color': 'rgb(201, 157, 242)',
      //   }),
      //   animate('250ms ease-out', style({
      //       transform: 'translateX(0)',
      //       opacity: 1,
      //       'background-color': 'white',
      //   })),
      //   query('span', [
      //       style({
      //           opacity: 0
      //       }),
      //       animate('500ms', style({
      //           opacity: 1
      //       }))
      //   ]),
      // ])
      transition(':enter', [
        // query('span', [
        //     style({
        //         opacity: 0
        //     }),
        // ]),
        // query('.comment-text, .comment-date', [
        //   style({
        //       opacity: 0
        //   })
        // ]),
        // query('.comment-text', [
        //   animate('250ms', style({
        //       opacity: 1
        //   }))
        // ]),
        // query('.comment-date', [
        //   animate('500ms', style({
        //       opacity: 1
        //   }))
        // ]),
        // group([
        //   query('.comment-text', [
        //       animate('250ms', style({
        //           opacity: 1
        //       }))
        //   ]),
        //   query('.comment-date', [
        //       animate('500ms', style({
        //           opacity: 1
        //       }))
        //   ]),
        // ]),
        // style({
        //         transform: 'translateX(-100%)',
        //         opacity: 0,
        //         'background-color': 'rgb(201, 157, 242)',
        //     }),
        //     animate('250ms ease-out', style({
        //         transform: 'translateX(0)',
        //         opacity: 1,
        //         'background-color': 'white',
        // })),
        // useAnimation(slideAndFadeAnimation),
        useAnimation(slideAndFadeAnimation, {
          params: {
              time: '500ms',
              startColor: 'rgb(201, 157, 242)'
          }
        }),
        group([          
          // sequence([
          //     animate('250ms', style({
          //         'background-color': 'rgb(255,7,147)'
          //     })),
          //     animate('250ms', style({
          //         'background-color': 'white'
          //     })),
          // ]),
          // useAnimation(flashAnimation),
          useAnimation(flashAnimation, {
            params: {
                time: '250ms',
                flashColor: 'rgb(249,179,111)'
                // flashColor: 'red'
            }
          }),
          query('.comment-text', [
              animate('250ms', style({
                  opacity: 1
              }))
          ]),
          query('.comment-date', [
              animate('500ms', style({
                  opacity: 1
              }))
          ]),
        ]),
        // style({
        //     transform: 'translateX(-100%)',
        //     opacity: 0,
        //     'background-color': 'rgb(201, 157, 242)',
        // }),
        // animate('250ms ease-out', style({
        //     transform: 'translateX(0)',
        //     opacity: 1,
        //     'background-color': 'white',
        // })),
        // query('span', [
        //     animate('500ms', style({
        //         opacity: 1
        //     }))
        // ]),
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  listItemAnimationState: 'default' | 'active' = 'default';
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);

    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
        return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  // onLeaveComment() {
  //   if (this.commentCtrl.invalid) {
  //       return;
  //   }
  //   this.newComment.emit(this.commentCtrl.value);
  //   this.commentCtrl.reset();
  // }

  // onListItemMouseEnter() {
  //   this.listItemAnimationState = 'active';
  // }

  // onListItemMouseLeave() {
  //   this.listItemAnimationState = 'default';
  // }
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
