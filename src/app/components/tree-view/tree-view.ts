/**
 * Created by 104653 on 2/28/17.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {TreeNode, TreeLeafIF, TreeLeaf} from "../../services/interfaces/TreeNodeModel";
import {TreeBuilder} from "../../services/TreeBuilder/TreeBuilder.service";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";
import {plainToClass} from "class-transformer";

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: './tree-view.html',
  providers: [TreeBuilder, ServerConnection],
})
export class TreeView {
  @Output()  treeViewEvent: EventEmitter<TreeLeaf> = new EventEmitter();
  @Input()   cbAbTests: Array<TreeNode>;

  constructor( protected _treeNodes:TreeBuilder, protected _serverConnection:ServerConnection ) {
  }

  selectFile(item:TreeLeafIF) {
    let leaf = plainToClass(TreeLeaf,item);
    console.log('File Selected: ' + item.docName);
    let configDocName = leaf.getConfigDocName(this._serverConnection.getDocumentPrefix());
    console.log('Config Doc For File: ' + configDocName);
    this.treeViewEvent.emit(leaf);
  }

}
