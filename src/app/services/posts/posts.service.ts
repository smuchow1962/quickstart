/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
    abTests:any;

    constructor(private http: Http) {
      console.log('PostsService Initialized...');
      this.abTests = null;
    }

    getABTests() {
      if (this.abTests===null) {
        this.abTests = this.http.get('https://gf2.pfxdev.com/admin/get_ab_tests')
          .map(res => res.json());
        console.log('called url');
      }
      console.log('getabtests');
      return this.abTests;
    }

}
