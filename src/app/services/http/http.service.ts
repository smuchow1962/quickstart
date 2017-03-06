/**
 * Created by Steve Muchow on 3/2/17.
 */

import { Injectable }           from '@angular/core';
import { Http }                 from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  protected _server:string;

  constructor(protected _http:Http) {
    this._server = 'http://gf2.pfxdev.com/';
  }

  getRequest(server:string, endpoint:string) {
    return this._http.get(server+endpoint)
                     .map((res:any) => res.json());
  }

  getAbTests() {
    return this.getRequest(this._server,'admin/get_ab_tests');
  }



}
