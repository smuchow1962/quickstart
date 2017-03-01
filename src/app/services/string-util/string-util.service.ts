/**
 * Created by 104653 on 2/28/17.
 */
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StringUtil {
  static snakeCaseToWords(source:string)
  {
      let array = source.split('_');
      array.forEach(function (val:any, index:number, array:any) {
          let word = val.charAt(0) + val.slice(1);
          array[index] = word;
      });
      return array.join(' ');
  }

  static toString(val:number|string|undefined, _default:string = '') {
      if (val === undefined) {
        return _default;
      }
      return val.toString();
  }

}
