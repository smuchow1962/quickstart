import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http'

import { AppComponent }       from './app.component';
import { TestPage }           from './components/test/test.page';
import { TreeView }           from './components/tree-view/tree-view';
import { AbTestCore }         from './components/abtest-core-view/abtest-core';
import { PostsService }       from "./services/posts/posts.service";
import { HttpService }        from "./services/http/http.service";
import { HttpCommComponent }  from "./components/http-comm/http-comm";
import { ABTestDocument }     from "./services/ABTestDocument/ABTestDocument.service";
import { BodyWrapper }        from "./components/body-wrapper/body-wrapper";
import { ServerConnection }   from "./services/ServerConnection/ServerConnection.service";
import { Directory }          from "./components/tree-view/directory";
import { TreeBuilder }        from "./services/TreeBuilder/TreeBuilder.service";
import { HeaderView }         from "./components/header-view/HeaderView";


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, TestPage, TreeView, HttpCommComponent, AbTestCore, BodyWrapper, HeaderView ],
  bootstrap:    [ AppComponent ],
  providers:    [ PostsService, ABTestDocument, HttpService, Directory, ServerConnection, TreeBuilder ]
})
export class AppModule { }
