/**
 * Created by Steve Muchow on 3/2/17.
 */

import { Injectable }           from '@angular/core';
import { Http, Response }       from "@angular/http";
import { ServerConnection }     from "../ServerConnection/ServerConnection.service";
import { Observable }           from 'rxjs/observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
  isSecurelyWrapped: boolean = false;

  constructor(protected _http:Http, public _serverConnection:ServerConnection) {
  }

  getServerConnection() {
    return this._serverConnection;
  }

  getRequest(server:string, endpoint:string): Observable<any> {
    return this._http.get(server+endpoint)
                     .map(this.extractData);
                     // .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    if (this.isSecurelyWrapped) {
      return body.data;
    }
    return body;
  }
  private handleError(error: Response|any) {

  }

  getAbTests() {
    return this.getRequest(this._serverConnection.getUrl(),'admin/get_ab_tests');
  }
}
