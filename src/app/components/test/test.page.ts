import { Component }     from '@angular/core';
import { PostsService }  from '../../services/posts/posts.service';
import { Directory }     from '../tree-view/directory';
import { abTestIF, abContentsIF, abControlFlagIF, abItemIF, abResponsIF, abTestResponseIF,
         ABTestResponse } from '../interface/ABTestIF';

@Component({
  moduleId: module.id,
  selector: 'test',
  templateUrl: './test.page.html',
  providers: [PostsService]
})
export class TestPage {
  name: string; //: string;
  email: string; //: string;
  access: accessTree;
  abTestResponse: abTestResponseIF;
  treeNode: Array<Directory>;
  tests: string[];


  constructor(private postsService: PostsService) {
    console.log('TestPage.constructor()');
    this.name = 'Steve Muchow';
    this.email = 'smuchow1962@gmail.com';
    this.access = {
      names : []
    };

    this.postsService.getABTests().subscribe((posts: any) => {
      this.abTestResponse = posts;
      this.tests = this.parseABTestPost(this.abTestResponse);
      this.treeNode = this.makeDirectoriesFromABTestPost(this.abTestResponse);

      console.log(this.treeNode);
      this.access = {
        names : this.tests
      };
      console.log(this.abTestResponse);
    });

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

