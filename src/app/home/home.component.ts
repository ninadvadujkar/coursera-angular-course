import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(private _dishService: DishService, private _promotionService: PromotionService, 
    private _leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this._dishService.getFeaturedDish()
      .subscribe(
        dish => this.dish = dish,
        errMess => this.dishErrMess = <any>errMess
      );
    this._promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
    this._leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);
  }

}
