import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from '../../node_modules/nativescript-angular/common';

import { ClientesComponent } from '@src/app/clientes/clientes.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '@src/app/shared/router-reuse.class';
import { EmpresasComponent } from '@src/app/empresas/empresas.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    EmpresasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NativeScriptFormsModule,
    // NativeScriptRouterModule,
    // NativeScriptCommonModule,
  ],
  providers: [
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
