import {abTestIF} from "../../components/interface/ABTestIF";
import {StringUtil} from "../string-util/string-util.service";
import {Data} from "../../components/tree-view/directory";


export interface TreeLeafIF {
  testName: string;
  docName: string;
  id: string;
  label: string;
  enabled: boolean;
  variant: string;
  configDocName: string;
  priority: string;
  configContent: any;
  isConfigDirty: boolean;
  testContent: any;
  isTestContentDirty: boolean;
}

/**
 * defines all the items applicable to a TreeNode. This provides a simple description of a LEAF in the tree
 *
 */
export class TreeLeaf implements TreeLeafIF {
  constructor() {
  }

  set(  testName: string, docName:string, id:string, label:string, enabled:boolean
      , variant:string, configDocName:string, priority:string, contents:any) {
    this.testName = testName;
    this.docName = docName;
    this.id = id;
    this.label = label;
    this.enabled = enabled;
    this.variant = variant;
    this.configDocName = configDocName;
    this.priority = priority;
    this.testContent = contents;
  }

  public static getConfigDocumentName(leaf:TreeLeafIF, prefix:string) {
    return prefix + 'ab_config_' + leaf.testName + '_' + leaf.variant;
  }

  getConfigDocName(prefix: string) {
    return prefix + 'ab_config_' + this.testName + '_' + this.variant;
  }

  setConfigContent(data: any) {
    this.configContent = data;
    this.isConfigDirty = true;
  }

  getConfigContent() {
    this.isConfigDirty = false;
    return this.configContent;
  }

  public testName: string;
  public docName: string;
  public id: string;
  public label: string;
  public enabled: boolean;
  public variant: string;
  public configDocName: string; // the configuration document {prefix}ab_config_{test_name}_{variant}
  public priority: string;
  public configContent: any;
  public isConfigDirty: boolean = false;
  public testContent: any;
  public isTestContentDirty: boolean = false;
}


export class TreeNodeMetaData {
  public label:string;
}


/**
 * All important data class describing data used to build a tree control of AB Tests.
 * TODO: could be modified to be more generic in the future.
 */
export class TreeNode {

  public metaData:TreeNodeMetaData = new TreeNodeMetaData();
  public nodes:Array<TreeNode> = [];
  public leafs:Array<TreeLeaf> = [];
  public expanded: boolean;

  hasNodes() {
    return this.nodes.length > 0;
  }
  hasLeafs() {
    return this.leafs.length > 0;
  }

  /**
   * This generates all the ABTestGroup files underneath a given ABTest. If Early Access has 4 ABTestGroups, then the
   * 4 document names and special info will be added to the Leafs array. At this time, there is no cascading AB testing,
   * so the node will be flat.
   * @param test
   * @param prefix
   *
   * a test item's configContent corresponds to the fields available in gf2/src/common/abTest/ABTestGroup.php::ABTestGroupSchema
   */
  setLeafsFromABTest(test: abTestIF, prefix:string) {
    // console.log('setLeafsFromABTest');
    // console.log(test);

    this.metaData.label = test.test;

    let newList: any = [];

    test.items.forEach(function (item) {

      let configDoc = prefix + 'ab_config_' + item.contents.testName + '_' + item.contents.variant;
      // let configDoc = prefix + 'ab_config_' + item.contents.testName + '_' + item.contents.variant;
      let testDoc = StringUtil.toString(item.docId, '---');
      let variant = StringUtil.toString(item.contents.variant, '1');
      let priority = StringUtil.toString(item.contents.priority, '0');

      let dataElem = new TreeLeaf();
      dataElem.set(
        test.test,
        item.docName,
        testDoc,
        item.contents.description,
        item.contents.enabled,
        variant,
        configDoc,
        priority,
        item.contents,
      );

      //console.log(dataElem);
      newList.push(dataElem);

    });

    this.leafs = newList;
  }

  getTestNames() {
    return this.leafs;
  }

  displayLabel() {
    return this.metaData.label;
  }

  toggle() {
    this.expanded = !this.expanded;
    console.log('toggle ' + this.displayLabel() + ' ' + ((this.expanded)?'EXPAND':'---'));
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


}
