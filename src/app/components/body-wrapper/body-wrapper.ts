/**
 * Created by 104653 on 3/7/17.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {TreeLeaf} from "../../services/interfaces/TreeNodeModel";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";

@Component({
  moduleId: module.id,
  selector: 'body-wrapper',
  template: `
  <div class=ab-body-wrapper>
  <div class=ab-test-browser-container>
    <div class=tree-control-container>
      <div class="tree-list">
        <test-component  [(currentABTestGroup)]="treeLeafObject"   (onDocNameToLoad)="loadConfigDocument($event)" class="tree-list-inner"></test-component>
      </div>
      <div class=tree-entry>
        <div class=tree-entry-inner>ddd entry inner data</div>
      </div>
    </div>
  </div>
  <div class=ab-test-content-container>
    <div class=tab-view>
      <div class=tab-inner>
        {{configDocumentName}}
        </div>
    </div>
  </div>

</div>
  `,
  // inputs: [ 'cbAbTests' ],
  // outputs: [ 'selectFile' ],
})
export class BodyWrapper {

  constructor(protected _serverConnection:ServerConnection) {}
  testString:string;
  treeLeafObject:TreeLeaf;
  configDocumentName: string;

  loadConfigDocument(leafObject:TreeLeaf) {
    this.treeLeafObject = leafObject;
    this.configDocumentName = leafObject.getConfigDocName(this._serverConnection.getDocumentPrefix());
    console.log('BodyWrapper::loadConfigDocument: ' + this.configDocumentName);
  }


}
