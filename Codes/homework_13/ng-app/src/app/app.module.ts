import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IsVisibleDirective } from './is-visible.directive';
import { MakeBiggerDirective } from './make-bigger.directive';
import { MultiPipe } from './multi.pipe';
import { SmartComponent } from './smart/smart.component';
import { DumbComponent } from './dumb/dumb.component';

@NgModule({
  declarations: [
    AppComponent,
    IsVisibleDirective,
    MakeBiggerDirective,
    MultiPipe,
    SmartComponent,
    DumbComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
