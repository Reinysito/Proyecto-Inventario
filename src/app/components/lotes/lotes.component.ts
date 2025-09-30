import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-Lotes',
  templateUrl: './Lotes.component.html',
  styleUrls: ['./Lotes.component.css']
})
export class LotesComponent {
  Lotesform: FormGroup;
  Lotes: any[] = [];
  LotesFiltrados: any[] = [];
  searchInput: string = '';
  private apiurl = enviroment.api_url;
  editar: boolean = false;
  EditarID: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.Lotesform = this.fb.group({
      CantidadHelados: [0, [Validators.required, Validators.min(0)]],
      CapitalInicial: [0, [Validators.required, Validators.min(0)]],
      CostoTotalLote: [0, [Validators.required, Validators.min(0)]],
      PrecioVentaUnitario: [0, [Validators.required, Validators.min(0)]],
      Descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.obtenerLotes();
  }

  obtenerLotes() {
    this.http.get<any[]>(`${this.apiurl}/Lotes`).subscribe({
      next: (data) => {
        this.Lotes = data;
        this.LotesFiltrados = data;
        console.log('Lotes cargados:', this.Lotes);
      },
      error: (err) => {
        console.error('Error al obtener los Lotes', err);
      }
    });
  }  

  buscarLotes() {
    const texto = this.searchInput.trim().toLowerCase();
    if (!texto) {
      this.LotesFiltrados = [...this.Lotes];
    } else {
      this.LotesFiltrados = this.Lotes.filter(p =>
        p.loteId.toString().toLowerCase().includes(texto) 
      );
    }
  }

  limpiarBusqueda() {
    this.searchInput = '';
    this.LotesFiltrados = [...this.Lotes];
  }

  guardarLotes() {
    if (this.Lotesform.invalid) {
      alert('Falta un dato');
      return;
    }

    const fechaActual = new Date().toISOString();

    const guardar = {
      ...this.Lotesform.value,
      FechaCreacion: fechaActual   
    };

    const actualizar = {
      LoteId: this.EditarID,       
      FechaCreacion: fechaActual,
      ...this.Lotesform.value,
    };

    if (this.EditarID && this.editar) {
      this.http.put(`${this.apiurl}/Lotes/${this.EditarID}`, actualizar).subscribe({
        next: () => {
          alert(`Lote actualizado`);
          this.obtenerLotes();
          this.resetformulario();
        },
        error: (err) => {
          console.error("Error al actualizar Lote", err)
        }
      })
    } else {
      this.http.post(`${this.apiurl}/Lotes`, guardar).subscribe({
        next: () => {
          alert('Lote agregado');
          this.Lotesform.reset();
          this.obtenerLotes();
        }
      })
    }
  }

  editarLotes(lote: any) {
    this.editar = true;
    this.EditarID = lote.loteId;  // 👈 coherente

    this.Lotesform.patchValue({
      CantidadHelados: lote.cantidadHelados,
      CapitalInicial: lote.capitalInicial,
      CostoTotalLote: lote.costoTotalLote,
      PrecioVentaUnitario: lote.precioVentaUnitario,
      VentasTotales: lote.ventasTotales,
      HeladosVendidos: lote.heladosVendidos,
      EstadoLote: lote.estadoLote,
      Descripcion: lote.descripcion
    });
  }

  EliminarLotes(loteId: number) {
    if (confirm('¿Desea borrar este Lote?')) {
      this.http.delete(`${this.apiurl}/Lotes/${loteId}`).subscribe({
        next: () => {
          alert('Lote eliminado');
          this.obtenerLotes();
        },
        error: (err) => {
          console.error('Error al eliminar Lote', err);
        }
      });
    }
  }

  resetformulario() {
    this.Lotesform.reset();
    this.editar = false;
    this.EditarID = null;
  }
}
