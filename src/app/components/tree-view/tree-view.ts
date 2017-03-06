/**
 * Created by 104653 on 2/28/17.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Directory, DataIF }                      from './directory';
import { abTestIF, abTestResponseIF }             from '../interface/ABTestIF';

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: './tree-view.html',
  providers: [Directory],
  // inputs: [ 'cbAbTests' ],
  // outputs: [ 'selectFile' ],
})
export class TreeView {
  @Output()  treeViewEvent: EventEmitter<abTestResponseIF> = new EventEmitter();
  @Input()   cbAbTests: Array<Directory>;

  constructor( protected _directory:Directory ) {}

  selectFile(item:DataIF) {
    console.log('File Selected: ' + item.docName);
    let doc = this._directory.getCouchbaseDocument(item.docName);
    console.log(doc);
    this.treeViewEvent.emit(doc);
  }

}
