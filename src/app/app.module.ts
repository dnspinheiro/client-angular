import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/router-reuse.class';
import { EmpresasComponent } from './empresas/empresas.component';
// import { Service } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    EmpresasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
