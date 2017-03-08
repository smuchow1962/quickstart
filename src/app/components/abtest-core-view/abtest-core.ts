/**
 * Created by 104653 on 3/4/17.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Directory, DataIF }                      from '../tree-view/directory';
import { abTestIF, abTestResponseIF }             from '../interface/ABTestIF';
import { TestPage }                               from '../test/test.page'
import { ABTestDocument}                          from '../../services/ABTestDocument/ABTestDocument.service';


@Component({
  moduleId: module.id,
  selector: 'ABTestCore',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // templateUrl: './tree-view.html',
  template: `
<div  >
docdata<br>
      DOCUMENT: {{documentData}}    
</div>
     
  `,
  providers: [Directory, ABTestDocument],
  // directives: [ TestPage ],
})
export class AbTestCore {
  @Input()  testString:string;
  @Input()  documentData:string;

  constructor( protected _directory:Directory, protected _testDocument:ABTestDocument ) {
    console.log('built AbTestCore and ABTestDocument');
  }


  applyDocument(documentName:any) {
    console.log('applyDocument: ' + documentName);

  }

}
