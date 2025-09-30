import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
})
export class VentasComponent implements OnInit {
  lotes: any[] = [];
  venta = {
    loteId: 0,
    cantidadHelados: 0,
    precioUnitario: 0,
    totalVenta: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // cargar lotes para el combo
    this.http.get<any[]>(enviroment.api_url + '/Lotes')
      .subscribe(data => this.lotes = data);
  }

  registrarVentaCompleta() {
    // calcular el total de la venta
    this.venta.totalVenta = this.venta.cantidadHelados * this.venta.precioUnitario;

    // 1. Actualizar el lote
    this.http.put(enviroment.api_url + '/Lotes/RegistrarVenta', this.venta)
      .subscribe({
        next: () => {
          console.log('Lote actualizado ✅');

          // 2. Registrar en tabla Ventas
          this.http.post(enviroment.api_url + '/Ventas', this.venta)
            .subscribe({
              next: () => {
                alert('Venta registrada con éxito en Lote y Tabla Ventas ✅');
                this.venta = { loteId: 0, cantidadHelados: 0, precioUnitario: 0, totalVenta: 0 };
              },
              error: err => {
                console.error('Error registrando en Ventas', err);
                alert('Error al registrar en tabla Ventas ❌');
              }
            });
        },
        error: err => {
          console.error('Error actualizando Lote', err);
          alert('Error al actualizar Lote ❌');
        }
      });
  }
}
