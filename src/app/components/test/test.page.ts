import { Component, EventEmitter, Input, Output  }     from '@angular/core';
import { PostsService }  from '../../services/posts/posts.service';
import { Directory }     from '../tree-view/directory';
import { abContentsIF, abTestResponseIF } from '../interface/ABTestIF';
import { ABTestDocument }       from "../../services/ABTestDocument/ABTestDocument.service";
import { plainToClass }         from "class-transformer";
import { ABTestsResponseModel } from "../../services/interfaces/ABTestsResponseModel";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";

@Component({
  moduleId: module.id,
  selector: 'test',
  templateUrl: './test.page.html',
  providers: [PostsService, ServerConnection],

})
export class TestPage {
  @Input() configDocumentName: string = 'SAM'; //: string;
  email: string; //: string;
  access: accessTree;
  abTestResponse: abTestResponseIF;
  abConfigInfoDoc: abContentsIF;
  treeNode: Array<Directory>;
  tests: string[];
  abTestResponseModel: any; // make the lint not complain???
  @Output() onDocNameToLoad = new EventEmitter<string>();

  constructor(private _postService: PostsService, private _abTestDocument:ABTestDocument) {
    console.log('TestPage.constructor()');
    console.log(this._abTestDocument);
    this.configDocumentName = 'Steve Muchow';
    this.email = 'smuchow1962@gmail.com';
    this.access = {
      names : []
    };

    this._postService.getABTests().subscribe((posts: any) => {
      this.abTestResponse = posts;
      let dataObj = plainToClass(ABTestsResponseModel,posts);
      this.abTestResponseModel = dataObj;
      this.tests = this.parseABTestPost(this.abTestResponse);
      this.treeNode = this.makeDirectoriesFromABTestPost(this.abTestResponse);

      console.log(this.treeNode);
      this.access = {
        names : this.tests
      };
      console.log(this.abTestResponse);
    });

  }

  configDocEvent(arg:any) {
    if (arg !== undefined) {
      console.log('EVENT PROPAGATED UPWARD:');
      this.abConfigInfoDoc = arg;
      let data = arg.responses[0].data;
      console.log(data);
      this.configDocumentName = 'v2_ab_config_' + data.testName + '_' + data.variant;
      this.onDocNameToLoad.emit(this.configDocumentName);

      // this.configDocumentName = this.abConfigInfoDoc.getConfigDocName('v2_');
    }
  }

  parseABTestPost(data: abTestResponseIF) {
    let result: string[] = [];

    for (let test of data.responses[0].tests) {
      let count = test.items.length;
      let str = test.test + " (" + count + ')';
      result.push(str);
    }

    return result;
  }

  makeDirectoriesFromABTestPost(data: abTestResponseIF) {
    let result = Array<Directory>();

    let tests = data.responses[0].tests;
    for (let test of tests) {
      let count = test.items.length;
      let directory = new Directory();
      // console.log(directory);
      directory.setFromABTest(test, 'v2_');
      result.push(directory);
    }

    // console.log(result);
    return result;
  }


  addABTest(testName: string) {
    this.access.names.push(testName);
  }

}

interface accessTree {
  names: string[];
}


//declare module namespace {


//}

