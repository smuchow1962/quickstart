/**
 * Created by Steve Muchow on 3/5/17.
 */
import {Component, EventEmitter, OnInit}     from '@angular/core';
import { Injectable, Input, Output }  from '@angular/core';
import { HttpService }                from "../http/http.service";
import { ABTestResponse, ABTestGroupContents } from "../../components/interface/ABTestIF";
import {ServerConnection} from "../ServerConnection/ServerConnection.service";
import {Http} from "@angular/http";
import {TreeLeaf} from "../interfaces/TreeNodeModel";
import {PostsService} from "../posts/posts.service";
import { plainToClass }               from "class-transformer";
import {ABTestConfigResponseModel} from "../interfaces/ABTestConfigResponseModel";


/**
 * To use an EXTERNAL javascript library, load the script
 */

declare var Unibabel: any;

@Injectable()
export class ABTestDocument {
  public documentDom: any = {"testItem":"this is a test item to display in the window"};
  public documentName: string;
  public uniBabel: any;
  currentABTestGroup: TreeLeaf;
  abTestResponse: any;
  abTestConfigResponseModel: any;

  constructor (protected _http:Http, protected _serverConnection:ServerConnection, protected _postService:PostsService) {
    console.log('Contructing ABTestDocument' ,this._http);
    console.log('Unibabel', Unibabel);
  }

  save() {
    let param = JSON.stringify(this.documentDom);
    let base64 = Unibabel.utf8ToBase64(param);


  }

  setData(docData: any) {

  }

  configDocEvent(arg:TreeLeaf) {
    if (arg !== undefined) {
      console.log('ABTestDocument::configDocEvent(): ' + arg.docName );
      this.currentABTestGroup = arg;

      // this.treeLeafObject = this.abConfigInfoDoc.getConfigDocName('v2_');
    }
  }


  // load(docName: string) {
  //   this.documentName = docName;
  //   let dom = this.getCouchbaseDocument(docName);
  //   this.documentDom = dom;
  //   return dom;
  // }


  getConfigCouchbaseDocument(docName: string) {
    console.log('ABTestDocument::getConfigCouchbaseDocument ' + docName);

    this.documentName = docName;
    this._postService.getCouchbaseDocument(docName).subscribe((posts: any) => {
      this.abTestResponse = posts;
      if (posts !== undefined) {
        this.abTestConfigResponseModel = this.getActualDocument(plainToClass(ABTestConfigResponseModel, posts));
        console.log('ABTestDocument::getConfigCouchbaseDocument('+ docName +') ==============================');
        console.log(this.abTestConfigResponseModel);
      }
      else {
        console.log('ABTestDocument::getConfigCouchbaseDocument ========== FAIL');
      }
    });
    return this.abTestConfigResponseModel;
  }

  getActualDocument(originalModel: any) {
    let data = originalModel.responses[0].data;
    return data;
  }

  // getCouchbaseDocument(docName:string) {
  //   let name = this._serverConnection.getUrl() + 'admin/couchbase_get/' + docName;
  //   console.log('ABTestDocument::getCouchbaseDocument(name): ' + name );
  //   return this._http.get(name)
  //     .map(res => res.json());
  // }



}

