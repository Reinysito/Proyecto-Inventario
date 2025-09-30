import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostosComponent } from './components/costos/costos.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { SociosComponent } from './components/socios/socios.component';
import { PorcentajeGananciasLoteComponent } from './components/porcentaje-ganancias-lote/porcentaje-ganancias-lote.component';
import { TransaccionescapitalsComponent } from './components/transaccionescapitals/transaccionescapitals.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { GananciasComponent } from './components/ganancias/ganancias.component';

const routes: Routes = [{path: 'costos', component: CostosComponent},
  {path: 'lotes', component: LotesComponent}, 
  {path: 'socios', component:SociosComponent}, 
  {path:'porcentaje', component: PorcentajeGananciasLoteComponent}, 
  {path:'transacciones', component: TransaccionescapitalsComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'mantenimiento', component: MantenimientoComponent},
  {path: 'ganancias', component: GananciasComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
