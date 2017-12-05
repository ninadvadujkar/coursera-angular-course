import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;

  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required': 'Author is required',
      'minlength': 'Author name must be atleast 2 characters long',
    },
    'comment': {
      'required': 'Comment is required',
    }
  };

  constructor(private _dishService: DishService, private _location: Location, 
    private _route: ActivatedRoute, private _fb: FormBuilder, @Inject('BaseURL') private BaseURL) { 
    this.createForm();
  }

  ngOnInit(): void {
    this._dishService.getDishIds()
      .subscribe(
        dishIds => this.dishIds = dishIds,
        errMess => this.errMess = <any>errMess
      );

    this._route.params
      .switchMap((params: Params) =>  this._dishService.getDish(+params.id))
      .subscribe(
        dish => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        },
        errMess => {
          this.errMess = <any>errMess;
        } 
      );
  }

  createForm(): void {
    this.commentForm = this._fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) return;
    let form = this.commentForm;

    for(let field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(let key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.dish.comments.push(this.comment);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this._location.back();
  }
}