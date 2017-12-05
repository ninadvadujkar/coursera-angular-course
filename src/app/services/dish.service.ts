import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';

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
    private _processHttpMsgService: ProcessHttpmsgService, private _restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this._restangular.all('dishes').getList();
    /*return this._http.get(baseURL + 'dishes')
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      });*/
  }

  getDish(id: number): Observable<Dish> {
    return this._restangular.one('dishes', id).get();
/*    return this._http.get(baseURL + 'dishes/' + id)
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => { 
        return this._processHttpMsgService.handleError(error);
      });*/
  }

  getFeaturedDish(): Observable<Dish> {
    return this._restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
    /*return this._http.get(baseURL + 'dishees?featured=true')
      .map(res => {
        return this._processHttpMsgService.extractData(res)[0];
      })
      .catch(error => { 
        return this._processHttpMsgService.handleError(error);
      });*/
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => {
        return dishes.map(dish => dish.id);
      })
      .catch(error => { 
        return this._processHttpMsgService.handleError(error);
      });
  }
}
