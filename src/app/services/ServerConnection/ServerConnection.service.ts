/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable }                   from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Provides a simplified bes url for each server type we use
 * Allows for easy switching from one server to the other
 */

@Injectable()
export class ServerConnection {

  urls : any = {
    gf2 : {
      local:  'http://gflocal.scientificgames.com:8080/',
      dev:    'https://gf2.pfxdev.com/',
      qa:     'https://gf2.pfxtest.com/',
      prod:   'https://gf2.pfxprod.com/',
      prefix: 'v2_',
    },
    gf : {
      local:  'http://gflocal.scientificgames.com:8080/',
      dev:    'https://gf.pfxdev.com/',
      qa:     'https://gf.pfxtest.com/',
      prod:   'https://gf.pfxprod.com/',
      prefix: '',
    }

  };

  public currentGame: string;
  public currentServerType: string;
  public currentUrl: string = this.urls.dev;


  constructor() {
    this.setGame('gf2');
    this.setCurrentUrl('dev');
  }

  setGame(game: string) {
    this.currentGame = game;
  }

  setCurrentUrl(server: string) {
    this.currentServerType = server;
    this.currentUrl = this.urls[this.currentGame][server];
    console.log('ServerConnection::setCurrentUrl(): ' + server + '  serverType: ' + this.currentServerType);
  }

  getDocumentPrefix() {
    return this.urls[this.currentGame]['prefix'];
  }

  getServerType() {
    return this.currentServerType;

  }

  getUrl() {
    return this.currentUrl;
  }

}
