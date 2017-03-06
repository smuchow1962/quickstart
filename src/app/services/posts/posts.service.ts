/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable }                   from '@angular/core';
import { Http, URLSearchParams, Jsonp, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostsService {
    abTests:any;
    server:string;
    public static jsonp:Jsonp = null;
    public static http:Http = null;

    // constructor(private jsonp: Jsonp) {
    constructor(private http: Http) {
      console.log('PostsService Initialized...');
      this.abTests = null;
      this.server = 'https://gf2.pfxdev.com/';
      // console.log(this.jsonp);
      // PostsService.jsonp = this.jsonp;
      console.log(this.http);
      PostsService.http = this.http;
    }

    getABTests() {
      console.log('abtests');
      if (this.abTests===null) {
        let name = this.server + 'admin/get_ab_tests';
        // this.abTests = this.jsonp
        //                    .get(name + '?callback=JSONP_CALLBACK', {})
        //                    .toPromise()
        //                    .then((request) => request.json()[1]);




        this.abTests = this.http.get(this.server + 'admin/get_ab_tests')
          .map(res => res.json());


        console.log('called url');
      }
      console.log('getabtests');
      return this.abTests;
    }

    getCouchbaseDocument(docName:string) {
      return this.http.get(this.server + 'admin/couchbase_get/' + docName)
        .map(res => res.json());

      // console.log('PostsService docget: ' + docName);
      // let name = this.server + 'admin/get_ab_tests';
      // let doc = this.jsonp
      //   .get(name + '?callback=JSONP_CALLBACK', {})
      //   .toPromise()
      //   .then((request) => request.json()[1]);
      //
      // return doc;
    }

}
