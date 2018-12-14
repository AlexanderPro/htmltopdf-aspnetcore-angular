import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, ConfigDialogComponent, DropdownComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
}