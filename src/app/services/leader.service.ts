import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor(private _http: Http, private _processHttpmsgService: ProcessHttpmsgService, private _restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this._restangular.all('leaders').getList();
    /*return this._http.get(baseURL + 'leaders')
      .map(res => {
        return this._processHttpmsgService.extractData(res);
      });*/
  }

  getFeaturedLeader(): Observable<Leader> {
    return this._restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
    /*return this._http.get(baseURL + 'leaders?featured=true')
    .map(res => {
      return this._processHttpmsgService.extractData(res)[0];
    });*/
  }
}