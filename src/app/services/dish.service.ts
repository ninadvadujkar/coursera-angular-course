import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor(private _http: Http, 
    private _processHttpMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this._http.get(baseURL + 'dishes')
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      });
  }

  getDish(id: number): Observable<Dish> {
    return this._http.get(baseURL + 'dishes/' + id)
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      });
  }

  getFeaturedDish(): Observable<Dish> {
    return this._http.get(baseURL + 'dishes?featured=true')
      .map(res => {
        return this._processHttpMsgService.extractData(res)[0];
      });
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => {
        return dishes.map(dish => dish.id);
      });
  }
}
