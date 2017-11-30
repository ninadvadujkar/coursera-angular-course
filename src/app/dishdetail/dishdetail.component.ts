import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  constructor(private _dishService: DishService, private _location: Location, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this._route.snapshot.params['id'];
    this.dish = this._dishService.getDish(id);
  }

  goBack(): void {
    this._location.back();
  }
}