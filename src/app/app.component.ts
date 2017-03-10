import { Component } from '@angular/core';
import {ServerConnection} from "./services/ServerConnection/ServerConnection.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.components.html',
  providers: [],
})
export class AppComponent  {

  constructor(protected _serverConnection:ServerConnection) {
  }

}
