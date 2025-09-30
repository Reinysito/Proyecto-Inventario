import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostosComponent } from './components/costos/costos.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { SociosComponent } from './components/socios/socios.component';
import { TransaccionescapitalsComponent } from './components/transaccionescapitals/transaccionescapitals.component';
import { PorcentajeGananciasLoteComponent } from './components/porcentaje-ganancias-lote/porcentaje-ganancias-lote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/principal/principal.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { GananciasComponent } from './components/ganancias/ganancias.component';

@NgModule({
  declarations: [
    AppComponent,
    CostosComponent,
    LotesComponent,
    SociosComponent,
    TransaccionescapitalsComponent,
    PorcentajeGananciasLoteComponent,
    PrincipalComponent,
    MantenimientoComponent,
    VentasComponent,
    GananciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
