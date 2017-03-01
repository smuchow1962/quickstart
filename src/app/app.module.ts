import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule}     from '@angular/http'

import { AppComponent }  from './app.component';
import { TestPage }      from './components/test/test.page';
import { TreeView }      from './components/tree-view/tree-view';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, TestPage, TreeView ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
