import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.css']
})
export class GananciasComponent implements OnInit {

  lotes: any[] = [];
  ventas: any[] = [];
  costos: any[] = [];
  ganancias: any[] = [];
  gananciasFiltradas: any[] = [];

  fechaInicio!: string;
  fechaFin!: string;

  totalVentas: number = 0;
  totalCostos: number = 0;
  totalGanancia: number = 0;

  private apiurl = enviroment.api_url;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    forkJoin({
      lotes: this.http.get<any[]>(`${this.apiurl}/Lotes`),
      ventas: this.http.get<any[]>(`${this.apiurl}/Ventas`),
      costos: this.http.get<any[]>(`${this.apiurl}/Costos`)
    }).subscribe({
      next: ({ lotes, ventas, costos }) => {
        this.lotes = lotes;
        this.ventas = ventas;
        this.costos = costos;

        console.log('Lotes:', lotes);
        console.log('Ventas:', ventas);
        console.log('Costos:', costos);

        this.calcularGanancias();
        this.filtrarGanancias(); 
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      }
    });
  }

  calcularGanancias() {
    this.ganancias = this.lotes.map(lote => {
      const ventasLote = this.ventas.filter(v => v.loteId === lote.loteId);
      const costosLote = this.costos.filter(c => c.loteId === lote.loteId);

      const totalVentas = ventasLote.reduce(
        (sum, v) => sum + (v.totalVenta ?? v.cantidadHelados * v.precioUnitario), 0
      );
      const totalCostos = costosLote.reduce((sum, c) => sum + (c.monto ?? 0), 0);
      const ganancia = totalVentas - totalCostos;

      const fechaPrimeraVenta = ventasLote.length > 0
        ? ventasLote.reduce((min, v) => new Date(v.fechaVenta) < new Date(min) ? v.fechaVenta : min, ventasLote[0].fechaVenta)
        : lote.fechaCreacion;

      const fechaUltimaVenta = ventasLote.length > 0
        ? ventasLote.reduce((max, v) => new Date(v.fechaVenta) > new Date(max) ? v.fechaVenta : max, ventasLote[0].fechaVenta)
        : lote.fechaCreacion;

      return {
        lote: lote.descripcion,
        fechaPrimeraVenta,
        fechaUltimaVenta,
        ventasTotales: totalVentas,
        costosTotales: totalCostos,
        ganancia
      };
    });
  }

  filtrarGanancias() {
    const inicio = this.fechaInicio ? new Date(this.fechaInicio) : new Date('1900-01-01');
    const fin = this.fechaFin ? new Date(this.fechaFin) : new Date('9999-12-31');

    this.gananciasFiltradas = this.ganancias.filter(g => {
      const fecha = new Date(g.fechaUltimaVenta);
      return fecha >= inicio && fecha <= fin;
    });

    this.totalVentas = this.gananciasFiltradas.reduce((sum, g) => sum + g.ventasTotales, 0);
    this.totalCostos = this.gananciasFiltradas.reduce((sum, g) => sum + g.costosTotales, 0);
    this.totalGanancia = this.gananciasFiltradas.reduce((sum, g) => sum + g.ganancia, 0);
  }
}
