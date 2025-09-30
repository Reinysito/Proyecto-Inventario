import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-porcentaje-ganancias-lote',
  templateUrl: './porcentaje-ganancias-lote.component.html',
  styleUrls: ['./porcentaje-ganancias-lote.component.css']
})
export class PorcentajeGananciasLoteComponent {
 Porcentajeform: FormGroup;
  Porcentaje: any[] = [];
  socio: any[] = [];
  Lotes: any[] = [];
  PorcentajeFiltrados: any[] = [];
  searchInput: string = '';
  private apiurl = enviroment.api_url;
  editar: boolean = false;
  EditarID: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.Porcentajeform = this.fb.group({
      SocioId: [0, [Validators.required,Validators.min(0)]],
      LoteId: [0, [Validators.required,Validators.min(0)]],
      Porcentaje: [0, [Validators.required,Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.obtenerPorcentaje();
    this.obtenerSocio();
    this.obtenerLotes();
  }
    obtenerSocio() {
    this.http.get<any[]>(`${this.apiurl}/Socios`).subscribe({
      next: (data) => {
        this.socio = data;
        console.log('Socios cargados:', this.socio);
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

  obtenerPorcentaje() {
    this.http.get<any[]>(`${this.apiurl}/PorcentajesGananciaLote`).subscribe({
      next: (data) => {
        this.Porcentaje = data;
        this.PorcentajeFiltrados = data;
        console.log('Porcentajes cargados:', this.Porcentaje);
      },
      error: (err) => {
        console.error('Error al obtener los Porcentajes', err);
      }
    });
  }  

buscarPorcentaje() {
  const texto = this.searchInput.trim().toLowerCase();
  if (!texto) {
    this.PorcentajeFiltrados = [...this.Porcentaje];
  } else {
    this.PorcentajeFiltrados = this.Porcentaje.filter(p =>
      p.idPorcentaje.toString().toLowerCase().includes(texto)
    );
  }
}
  limpiarBusqueda() {
  this.searchInput = '';
  this.PorcentajeFiltrados = [...this.Porcentaje];
}

  guardarPorcentaje() {
   if (this.Porcentajeform.invalid) {alert('Falta un dato')
 
   } ;


  const fechaActual = new Date().toISOString(); 

  const guardar = {
  ...this.Porcentajeform.value,
  Fecha: fechaActual, 
  };

  const actualizar = {
    PorcentajeLoteId: this.EditarID,
        Fecha: fechaActual,
    ...this.Porcentajeform.value,
  };

console.log("Datos enviados al Banckend", guardar,actualizar);
console.log("ID que estas mandando al Banckend",this.EditarID)

if(this.EditarID && this.editar !== null){
this.http.put(`${this.apiurl}/PorcentajesGananciaLote/${this.EditarID}`,actualizar).subscribe ({
  next: () => {
    alert(`Porcentaje actualizado`);
    this.obtenerPorcentaje();
  },
  error: (err) => {
    console.error("Error al actualizar Porcentaje",err)
  }
  
})}
else{
  this.http.post(`${this.apiurl}/PorcentajesGananciaLote`,guardar).subscribe({
    next: () => {
      alert('Porcentaje agregado');
      this.Porcentajeform.reset();
      this.obtenerPorcentaje();
    }
  })
} 

  }

editarPorcentaje(p: any) {
  this.editar = true;
  this.EditarID = p.porcentajeLoteId;

  this.Porcentajeform.patchValue({
    SocioId: p.socioId,
    LoteId: p.loteId,
    Porcentaje: p.porcentaje
  });
}

  EliminarPorcentaje(idPorcentaje: number) {
    if (confirm('¿Desea borrar este Porcentaje?')) {
      this.http.delete(`${this.apiurl}/PorcentajesGananciaLote/${idPorcentaje}`).subscribe({
        next: () => {
          alert('Porcentaje Eliminado');
          this.obtenerPorcentaje();
        },
        error: (err) => {
          console.error('Error al eliminar Porcentaje', err);
        }
      });
    }
  }

  resetformulario() {
    this.Porcentajeform.reset();
    this.editar = false;
    this.EditarID = null;
  }

}
