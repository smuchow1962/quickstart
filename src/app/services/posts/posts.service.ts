/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable }                   from '@angular/core';
import { Http, URLSearchParams, Jsonp, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ServerConnection } from "../ServerConnection/ServerConnection.service";

@Injectable()
export class PostsService {
    abTests:any;
    public static http:Http = null;

    constructor(private http: Http, protected _serverConnection:ServerConnection) {
      console.log('PostsService Initialized...');
      this.abTests = null;
      console.log(this.http);
      PostsService.http = this.http;
    }

    getABTests() {
      let name = this._serverConnection.getUrl() + 'admin/get_ab_tests';
         this.abTests = this.http.get(name)
          .map(res => res.json());
      console.log('called url: ' + name);
      return this.abTests;
    }

    getCouchbaseDocument(docName:string) {
      let name = this._serverConnection.getUrl() + 'admin/couchbase_get/' + docName;
      console.log('PostsServices::getConfigCouchbaseDocument(name): ' + name );
      return this.http.get(name)
        .map(res => res.json());
    }

}
