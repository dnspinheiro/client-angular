import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormComponent } from './shared/data-form.component';
import { ClientesComponent } from './clientes/clientes.component';


const routes: Routes = [
  // { path: 'dataForm', component: DataFormComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
