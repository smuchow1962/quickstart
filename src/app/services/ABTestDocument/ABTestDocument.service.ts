/**
 * Created by Steve Muchow on 3/5/17.
 */

import { Injectable, Input, Output }  from '@angular/core';
import { HttpService }                from "../http/http.service";
import { ABTestResponse, ABTestGroupContents } from "../../components/interface/ABTestIF";


/**
 * To use an EXTERNAL javascript library, load the script
 */

declare var Unibabel: any;

@Injectable()
export class ABTestDocument {
  public documentDom: any = {"testItem":"this is a test item to display in the window"};
  public documentName: string;
  public uniBabel: any;

  constructor (protected _httpService:HttpService) {
    console.log('Contructing ABTestDocument' ,this._httpService);
    console.log('Unibabel', Unibabel);
  }

  save() {
    let param = JSON.stringify(this.documentDom);
    let base64 = Unibabel.utf8ToBase64(param);


  }

  setData(docData: any) {

  }

  load(docName: string) {


  }




}

