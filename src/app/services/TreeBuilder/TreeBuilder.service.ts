/**
 * TreeBuilder is responsible for building the TreeNode used by the tree control.
 */
import { Injectable, OnInit }         from "@angular/core";
import { plainToClass }               from "class-transformer";

import { TreeNode }                   from "../interfaces/TreeNodeModel";
import { abTestResponseIF }           from "../../components/interface/ABTestIF";
import { PostsService }               from "../posts/posts.service";
import { ABTestConfigResponseModel }  from "../interfaces/ABTestConfigResponseModel";
import { ABTestsResponseModel }       from "../interfaces/ABTestsResponseModel";
import { ServerConnection }           from "../ServerConnection/ServerConnection.service";

export class TreeBuilderMetaData {
  displayLabel: string;
}

@Injectable()
export class TreeBuilder {

  abTestResponse : abTestResponseIF;
  abTestResponseModel: any;
  abTestConfigResponseModel: any;
  tests: string[];
  access: accessTree;

  metaData: TreeBuilderMetaData;
  nodes: Array<TreeNode> = [];

  constructor(protected _postService: PostsService, protected _serverConnection: ServerConnection) {
    console.log('TreeBuilder::constructor');
    this.onInit();
  }

  refreshList() {
    this.nodes = [];
    this.waitMessage();
    // this._postService.getABTests();
  }

  waitMessage() {
    this._postService.getABTests().subscribe((posts: any) => {
      this.abTestResponse = posts;
      this.abTestResponseModel = plainToClass(ABTestsResponseModel,posts);
      this.tests = this.parseABTestPost(this.abTestResponse);
      this.makeTreeNodesFromABTestPost(this.abTestResponse, this._serverConnection.currentGame);

      console.log(this.nodes);
      this.access = {
        names : this.tests
      };
      // console.log(this.abTestResponse);
    });
  }

  onInit() {
    console.log('TreeBuilder::onInit');
    this.waitMessage();
  }

  /**
   * A list of all the ABTests marked in the system
   * @param data
   * @returns {string[]}
   */
  parseABTestPost(data: abTestResponseIF) {
    let result: string[] = [];

    for (let test of data.responses[0].tests) {
      let count = test.items.length;
      let str = test.test + " (" + count + ')';
      result.push(str);
    }

    return result;
  }

  /**
   * generates an array of nodes to display within a AB test tree viewer. provides appropriate metadata
   * to fully describe the nature of the tree leaf or node to show (default vs priority, expired,
   * simple vs mod-grouped, etc.)
   * @param data        data returned from the 'admin/get_ab_tests' endpoint call
   * @param prefix      game-specific couchbase document prefix (like 'v2_')
   * @returns {any[]}   a list of TreeNodes with each node corresponding to a single AB test feature (ie. all
   *                    Early Access items together and all Featured Slot items together). Each leaf is
   *                    a ABTestGroup object.
   */
  makeTreeNodesFromABTestPost(data: abTestResponseIF, prefix: string) {
    let result = Array<TreeNode>();

    let tests = data.responses[0].tests;
    for (let test of tests) {
      let testNode = new TreeNode();
      testNode.setLeafsFromABTest(test, prefix);
      result.push(testNode);
    }

    // console.log(result);
    this.nodes = result;
    return result;
  }

  getNodes() {
    return this.nodes;
  }

  getConfigCouchbaseDocument(docName: string) {
    console.log('TreeBuilder::getConfigCouchbaseDocument ' + docName);

    this._postService.getCouchbaseDocument(docName).subscribe((posts: any) => {
      this.abTestResponse = posts;
      if (posts !== undefined) {
        console.log('==============================');
        this.abTestConfigResponseModel = plainToClass(ABTestConfigResponseModel, posts);
        console.log(this.abTestConfigResponseModel);
      }
      else {
        console.log('getConfigCouchbaseDocument ========== FAIL');
      }
    });
    return this.abTestConfigResponseModel;
  }
}

interface accessTree {
  names: string[];
}
