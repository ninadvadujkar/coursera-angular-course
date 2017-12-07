import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  constructor(private _restangular: Restangular) { }

  submitFeedback(fb): Observable<Feedback> {
    return this._restangular.all('feedback').post(fb);
  }

}