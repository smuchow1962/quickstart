/**
 * Created by Steve Muchow on 3/2/17.
 */

import { Injectable }           from '@angular/core';
import { Http }                 from "@angular/http";
import { ServerConnection }     from "../ServerConnection/ServerConnection.service";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(protected _http:Http, public _serverConnection:ServerConnection) {
  }

  getServerConnection() {
    return this._serverConnection;
  }

  getRequest(server:string, endpoint:string) {
    return this._http.get(server+endpoint)
                     .map((res:any) => res.json());
  }

  getAbTests() {
    return this.getRequest(this._serverConnection.getUrl(),'admin/get_ab_tests');
  }
}
