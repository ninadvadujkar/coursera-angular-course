import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(private _http: Http, private _processHttpmsgService: ProcessHttpmsgService, private _restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this._restangular.all('promotions').getList();
    /*return this._http.get(baseURL + 'promotions')
      .map(res => {
        return this._processHttpmsgService.extractData(res);
      });*/
  }

  getPromotion(id: number): Observable<Promotion> {
    return this._restangular.one('promotions', id).get();
    /*return this._http.get(baseURL + 'promotions/' + id)
      .map(res => {
        return this._processHttpmsgService.extractData(res);
      });*/
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this._restangular.all('promotions').getList({featured: true})
    .map(promotions => promotions[0]);    
    /*return this._http.get(baseURL + 'promotions?featured=true')
    .map(res => {
      return this._processHttpmsgService.extractData(res)[0];
    });*/
  }

}
