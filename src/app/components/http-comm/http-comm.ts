/**
 * Created by 104653 on 3/2/17.
 */

import { Component }        from '@angular/core';
import { HttpService }      from "../../services/http/http.service";

@Component({
  selector: 'http-comm',
  template: `
    <button (click)='onTestGet()'>Test GET Request</button><br />
    <p>Output: {{getData}}</p>
    <button>Test POST Request</button><br />
    <p>Output: {{postData}}</p>
  `,
  // providers : [ HttpService ],

})
export class HttpCommComponent {
  getData: string;
  postData: string;

  constructor (protected _httpService:HttpService) {

  }

  onTestGet() {
    this._httpService.getAbTests()
      .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => console.log('getAbTests complete')
      )

  }
}
