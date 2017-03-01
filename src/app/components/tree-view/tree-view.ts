/**
 * Created by 104653 on 2/28/17.
 */
import {Component, Input} from '@angular/core';
import {Directory}        from './directory';

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: './tree-view.html'
})
export class TreeView {
  @Input() directories: Array<Directory>;
}
