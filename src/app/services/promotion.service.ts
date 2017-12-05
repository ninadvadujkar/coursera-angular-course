import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(private _http: Http, private _processHttpmsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this._http.get(baseURL + 'promotions')
      .map(res => {
        return this._processHttpmsgService.extractData(res);
      });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this._http.get(baseURL + 'promotions/' + id)
      .map(res => {
        return this._processHttpmsgService.extractData(res);
      });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this._http.get(baseURL + 'promotions?featured=true')
    .map(res => {
      return this._processHttpmsgService.extractData(res)[0];
    });
  }

}
