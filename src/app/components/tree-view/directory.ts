import 'rxjs/add/operator/map';
import {StringUtil}     from '../../services/string-util/string-util.service';
import {PostsService}   from "../../services/posts/posts.service";
import {Injectable}     from '@angular/core';
import {
  abTestIF,
  abTestResponseIF
} from '../interface/ABTestIF';
import {ABTestConfigResponseModel} from "../../services/interfaces/ABTestConfigResponseModel";
import {plainToClass} from "class-transformer";
import {ServerConnection} from "../../services/ServerConnection/ServerConnection.service";

@Injectable()
export class Directory {

  displayLabel: string;
  expanded: boolean;
  type: string;
  dataArray: Array<DataIF>;
  checked: boolean;
  abTestResponse: abTestResponseIF;
  abTestConfigResponseModel: any;

  constructor(protected _serverConnection: ServerConnection, protected _postsService: PostsService) {
    console.log('creating Directory');
    this.dataArray = [];
    this.expanded = false;
  }

  setFromABTest(abTest: abTestIF, prefix: string = '') {
    // console.log('setFromABTest');
    // console.log(abTest);

    this.displayLabel = abTest.test;
    // console.log(this);

    let newList: any = [];

    abTest.items.forEach(function (item) {

      let configDoc = prefix + 'ab_config_' + item.contents.testName + '_' + item.contents.variant;
      let testDoc = StringUtil.toString(item.docId, '---');
      let variant = StringUtil.toString(item.contents.variant, '1');
      let priority = StringUtil.toString(item.contents.priority, '0');

      let dataElem = new Data(
        item.docName,
        testDoc,
        item.contents.description,
        item.contents.enabled,
        variant,
        configDoc,
        priority
      );

      //console.log(dataElem);
      newList.push(dataElem);

    });
    this.dataArray = newList;
  }


  getCouchbaseDocument(docName: string) {
    console.log('docget ' + docName);

    this._postsService.getCouchbaseDocument(docName).subscribe((posts: any) => {
      this.abTestResponse = posts;
      if (posts !== undefined) {
        console.log('==============================');
        this.abTestConfigResponseModel = plainToClass(ABTestConfigResponseModel, posts);
        console.log(this.abTestConfigResponseModel);
      }
      else {
        console.log('getCouchbaseDocument ========== FAIL');
      }
    });
    return this.abTestConfigResponseModel;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  getIcon() {
    if (this.expanded) {
      return 'glyphicon glyphicon-folder-open';
    }
    return 'glyphicon glyphicon-folder-open';
  }

  getButtonClass(showVal: boolean) {
    if (showVal) {
      return 'btn-xs btn-success';
    }
    return 'btn-xs btn-disabled';
  }

  getFileIcon(showVal: boolean) {
    if (showVal) {
      return 'glyphicon  glyphicon-ok-sign';
    }
    return 'glyphicon glyphicon-ban-circle';
  }


  check() {
    this.checked = !this.checked;
    this.checkRecursive(this.checked);
  }

  checkRecursive(state: boolean) {
    // this.children.forEach(d => {
    //   d.checked = state;
    //   d.checkRecursive(state);
    // });
  }
}

export interface DataIF {
  docName: string;
  id: string;
  enabled: boolean;
  variant: string;
  configDocName: string;
  label: string;
  priority: string;
}

export class Data implements DataIF {
  constructor(public docName: string,
              public id: string,
              public label: string,
              public enabled: boolean,
              public variant: string,
              public configDocName: string,
              public priority: string,) {
  }
}
