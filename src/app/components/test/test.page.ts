import {Component, EventEmitter, Input, Output, OnInit}     from '@angular/core';
import { PostsService }  from '../../services/posts/posts.service';
import { Directory }     from '../tree-view/directory';
import { abContentsIF, abTestResponseIF } from '../interface/ABTestIF';
import { ABTestDocument }       from "../../services/ABTestDocument/ABTestDocument.service";
import { plainToClass }         from "class-transformer";
import { ABTestsResponseModel } from "../../services/interfaces/ABTestsResponseModel";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";
import {TreeBuilder} from "../../services/TreeBuilder/TreeBuilder.service";
import {TreeNode, TreeLeaf} from "../../services/interfaces/TreeNodeModel";
import {Http} from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'test-component',
  templateUrl: './test.page.html',
  providers: [PostsService],

})
export class TestPage implements OnInit {
  @Input() currentABTestGroup: TreeLeaf;
  email: string; //: string;
  treeNode: Array<TreeNode>;
  @Output() onDocNameToLoad = new EventEmitter<TreeLeaf>();

  constructor(private _postService: PostsService, private _abTestDocument:ABTestDocument,
              public treeBuilder:TreeBuilder, protected _serviceConnection:ServerConnection) {
    console.log('TestPage::constructor()');
  }

  ngOnInit() {
    console.log('TestPage::ngOnInit()');
    console.log(this._abTestDocument);
    this.email = 'smuchow1962@gmail.com';
  }

  configDocEvent(arg:TreeLeaf) {
    if (arg !== undefined) {
      console.log('EVENT PROPAGATED UPWARD: ' + arg );
      this.currentABTestGroup = arg;
      this.onDocNameToLoad.emit(this.currentABTestGroup);

      // this.treeLeafObject = this.abConfigInfoDoc.getConfigDocName('v2_');
    }
  }

  getTreeNode() {
    return this.treeBuilder.getNodes();
  }


}


//declare module namespace {


//}

