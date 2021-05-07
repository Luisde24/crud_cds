import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import {DataTablesModule} from "angular-datatables";
import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdsComponent } from './cds/cds.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    CdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
