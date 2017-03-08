/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable }                   from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServerConnection {

  constructor() {
    this.currentUrl = this.urls.qa;
  }

  urls : any = {
    local: 'localhost:8080/',
    dev: 'https://gf2.pfxdev.com/',
    qa: 'https://gf2.pfxtest.com/',
    prod: 'https://gf2.pfxprod.com/',
  };
  public currentUrl: string = this.urls.dev;

  setCurrentUrl(server: string) {
    this.currentUrl = this.urls[server];
  }

  getUrl() {
    return this.currentUrl;
  }

}
