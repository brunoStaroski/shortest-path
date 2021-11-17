import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatButtonModule,
        MatTableModule,
        MessagesModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
