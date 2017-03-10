/**
 * Created by 104653 on 3/4/17.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Directory, DataIF }                      from '../tree-view/directory';
import { abTestIF, abTestResponseIF }             from '../interface/ABTestIF';
import { TestPage }                               from '../test/test.page'
import { ABTestDocument}                          from '../../services/ABTestDocument/ABTestDocument.service';
import {TreeLeaf} from "../../services/interfaces/TreeNodeModel";


@Component({
  moduleId: module.id,
  selector: 'ABTestCore',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // templateUrl: './tree-view.html',
  template: `
  `,
  providers: [Directory, ABTestDocument],
  // directives: [ TestPage ],
})
export class AbTestCore {
  @Input()  testString:string;
  @Input()  documentData:string;
  currentABTestGroup : TreeLeaf;

  constructor( protected _directory:Directory, protected _testDocument:ABTestDocument ) {
    console.log('built AbTestCore and ABTestDocument');
  }

  configDocEvent(arg:TreeLeaf) {
    if (arg !== undefined) {
      console.log('ABTestCore::configDocEvent(): ' + arg.docName );
      this.currentABTestGroup = arg;

      // this.treeLeafObject = this.abConfigInfoDoc.getConfigDocName('v2_');
    }
  }


  applyDocument(documentName:any) {
    console.log('loadConfigDocument: ' + documentName);

  }

}
