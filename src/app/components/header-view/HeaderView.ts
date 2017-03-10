/**
 * Created by 104653 on 3/9/17.
 */
/**
 * Created by 104653 on 3/7/17.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {TreeLeaf} from "../../services/interfaces/TreeNodeModel";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";
import {TreeBuilder} from "../../services/TreeBuilder/TreeBuilder.service";

@Component({
  moduleId: module.id,
  selector: 'header-view',
  template: `
  <div class="container">
    <div class="row">
    <div class="span12">
    <p class="lead">SGI - Goldfish Casino Slots V2 AB Test Admin Tool</p>
    <div id="tab" class="bt-group" data-toggle="buttons">
    <a class="btn btn-default active" data-toggle="tab" (click)="setConnection('dev')">
    <input type="radio">DEV
</a>
    <a class="btn btn-default" data-toggle="tab" (click)="setConnection('qa')">
    <input type="radio">QA
</a>
    <a class="btn btn-default" data-toggle="tab" (click)="setConnection('prod')" >
    <input type="radio">PROD
</a>
The Base URL is: {{_serverConnection.getUrl()}}
</div>
</div>
    
</div>
  </div>
  `,
  // inputs: [ 'cbAbTests' ],
  // outputs: [ 'selectFile' ],
})
export class HeaderView {

  constructor(protected _serverConnection:ServerConnection, protected _treeBuilder: TreeBuilder) {
  }

  setConnection(type:string) {
    console.log('setting environment to: ' + type);
    this._serverConnection.setCurrentUrl(type);
    this._treeBuilder.refreshList();
  }


}
