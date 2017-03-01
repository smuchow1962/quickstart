import {abTestIF, abItemIF} from '../interface/ABTestIF';
import { StringUtil} from '../../services/string-util/string-util.service';

export class Directory {

    displayLabel: string;
    expanded: boolean;
    type: string;
    dataArray: Array<DataIF>;
    //children: Array<Directory>;
    checked: boolean;


    constructor() {
      // console.log('creating ')
      this.dataArray = new Array<DataIF>();
      this.expanded = false;
    }

    setFromABTest(abTest:abTestIF, prefix:string='') {
      // console.log('setFromABTest');
      // console.log(abTest);

      this.displayLabel = abTest.test;
      // console.log(this);

      let newList = new Array<DataIF>();

      abTest.items.forEach(function (item) {

        let configDoc = prefix + 'ab_config_' + item.contents.testName + '_' + item.contents.variant;
        let testDoc = StringUtil.toString(item.docId,'---');
        let variant = StringUtil.toString(item.contents.variant,'1');
        let priority = StringUtil.toString(item.contents.priority,'0');

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


    toggle() {
      this.expanded = !this.expanded;
    }

    getIcon() {
      if (this.expanded) {
        return 'glyphicon glyphicon-folder-open';
      }
      return 'glyphicon glyphicon-folder-open';
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
    constructor(
      public docName:string,
      public id:string,
      public label:string,
      public enabled: boolean,
      public variant: string,
      public configDocName: string,
      public priority: string,
    ) { }
  }
