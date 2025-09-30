import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-transaccionescapitals',
  templateUrl: './transaccionescapitals.component.html',
  styleUrls: ['./transaccionescapitals.component.css']
})
export class TransaccionescapitalsComponent {
 Transaccionesform: FormGroup;
  Transacciones: any[] = [];
  Socio: any[] = [];
  Lotes: any[] = [];
  TransaccionesFiltrados: any[] = [];
  searchInput: string = '';
  private apiurl = enviroment.api_url;
  editar: boolean = false;
  EditarID: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.Transaccionesform = this.fb.group({
      SocioId: [0, [Validators.required,Validators.min(0)]],
      LoteId: [0, [Validators.required,Validators.min(0)]],
      Monto: [0, [Validators.required,Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.obtenerTransacciones();
    this.obtenerSocio();
    this.obtenerLotes();
  }
    obtenerSocio() {
    this.http.get<any[]>(`${this.apiurl}/Socios`).subscribe({
      next: (data) => {
        this.Socio = data;
        console.log('Socios cargados:', this.Socio);
      },
      error: (err) => {
        console.error('Error al obtener los Socios', err);
      }
    });
  }  

    obtenerLotes() {
    this.http.get<any[]>(`${this.apiurl}/Lotes`).subscribe({
      next: (data) => {
        this.Lotes = data;
        console.log('Lotess cargados:', this.Lotes);
      },
      error: (err) => {
        console.error('Error al obtener los Lotess', err);
      }
    });
  }

  obtenerTransacciones() {
    this.http.get<any[]>(`${this.apiurl}/TransaccionesCapitals`).subscribe({
      next: (data) => {
        this.Transacciones = data;
        this.TransaccionesFiltrados = data;
        console.log('TransaccionesCapitals cargados:', this.Transacciones);
      },
      error: (err) => {
        console.error('Error al obtener los TransaccionesCapitals', err);
      }
    });
  }  

buscarTransacciones() {
  const texto = this.searchInput.trim().toLowerCase();
  if (!texto) {
    this.TransaccionesFiltrados = [...this.Transacciones];
  } else {
    this.TransaccionesFiltrados = this.Transacciones.filter(p =>
      p.idTransacciones.toString().toLowerCase().includes(texto)
    );
  }
}
  limpiarBusqueda() {
  this.searchInput = '';
  this.TransaccionesFiltrados = [...this.Transacciones];
}

  guardarTransacciones() {
   if (this.Transaccionesform.invalid) {alert('Falta un dato')
    return;
   } ;


  const fechaActual = new Date().toISOString(); 

  const guardar = {
  ...this.Transaccionesform.value,
  Fecha: fechaActual, 
  };

  const actualizar = {
    TransaccionId: this.EditarID,
        Fecha: fechaActual,
    ...this.Transaccionesform.value,
  };

console.log("Datos enviados al Banckend", guardar,actualizar);
console.log("ID que estas mandando al Banckend",this.EditarID)

if(this.EditarID && this.editar !== null){
this.http.put(`${this.apiurl}/TransaccionesCapitals/${this.EditarID}`,actualizar).subscribe ({
  next: () => {
    alert(`Transacciones actualizado`);
    this.obtenerTransacciones();
  },
  error: (err) => {
    console.error("Error al actualizar Transacciones",err)
  }
  
})}
else{
  this.http.post(`${this.apiurl}/TransaccionesCapitals`,guardar).subscribe({
    next: () => {
      alert('Transacciones agregado');
      this.Transaccionesform.reset();
      this.obtenerTransacciones();
    }
  })
} 

  }

  editarTransacciones(lote: any) {
  this.editar = true;
  this.EditarID = lote.TransaccionId; // coherente con buscarTransacciones

  this.Transaccionesform.patchValue({
    CantidadHelados: lote.cantidadHelados,
    CapitalInicial: lote.capitalInicial,
    CostoTotalLote: lote.costoTotalLote,
    PrecioVentaUnitario: lote.precioVentaUnitario,
    VentasTotales: lote.ventasTotales,
    EstadoLote: lote.estadoLote
  });
}

  EliminarTransacciones(idTransacciones: number) {
    if (confirm('¿Desea borrar este Transacciones?')) {
      this.http.delete(`${this.apiurl}/TransaccionesCapitals/${idTransacciones}`).subscribe({
        next: () => {
          alert('Transacciones Eliminado');
          this.obtenerTransacciones();
        },
        error: (err) => {
          console.error('Error al eliminar Transacciones', err);
        }
      });
    }
  }

  resetformulario() {
    this.Transaccionesform.reset();
    this.editar = false;
    this.EditarID = null;
  }

}
