/**
 * Created by 104653 on 3/7/17.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { abTestIF, abTestResponseIF }             from '../interface/ABTestIF';

@Component({
  moduleId: module.id,
  selector: 'body-wrapper',
  template: `

  Test {{configDocumentName}}
  <div class=ab-body-wrapper>
  <div class=ab-test-browser-container>
    <div class=tree-control-container>
      <div class="tree-list">
        <test  [(configDocumentName)]="configDocumentName"   (onDocNameToLoad)="applyDocument($event)" class="tree-list-inner"></test>
      </div>
      <div class=tree-entry>
        <div class=tree-entry-inner>ddd entry inner data</div>
      </div>
    </div>
  </div>
  <div class=ab-test-content-container>
    <div class=tab-view>
      <div class=tab-inner>
        ababab abababa
        </div>
    </div>
  </div>

</div>
  `,
  // inputs: [ 'cbAbTests' ],
  // outputs: [ 'selectFile' ],
})
export class BodyWrapper {

  constructor() {}
  testString:string;
  configDocumentName:string;


  applyDocument(documentName:any) {
    console.log('BodyWrapper::applyDocument: ' + documentName);
    if (documentName !== undefined) {
      this.configDocumentName = documentName;
    }
  }


}
