import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent {
 Costosform: FormGroup;
  Costos: any[] = [];
  Lotes: any[] = [];
  CostosFiltrados: any[] = [];
  searchInput: string = '';
  private apiurl = enviroment.api_url;
  editar: boolean = false;
  EditarID: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.Costosform = this.fb.group({
      LoteId: [0, [Validators.required,Validators.min(0)]],
      Monto: [0, [Validators.required,Validators.min(0)]],
      Descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.obtenerCostos();
    this.obtenerLotes();
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

  obtenerCostos() {
    this.http.get<any[]>(`${this.apiurl}/Costos`).subscribe({
      next: (data) => {
        this.Costos = data;
        this.CostosFiltrados = data;
        console.log('Costoss cargados:', this.Costos);
      },
      error: (err) => {
        console.error('Error al obtener los Costoss', err);
      }
    });
  }  

buscarCostos() {
  const texto = this.searchInput.trim().toLowerCase();
  if (!texto) {
    this.CostosFiltrados = [...this.Costos];
  } else {
    this.CostosFiltrados = this.Costos.filter(p =>
      p.idCostos.toString().toLowerCase().includes(texto)
    );
  }
}
  limpiarBusqueda() {
  this.searchInput = '';
  this.CostosFiltrados = [...this.Costos];
}

  guardarCostos() {
   if (this.Costosform.invalid) {alert('Falta un dato')
    return;
   } 
  const fechaActual = new Date().toISOString();

  const guardar = {
  ...this.Costosform.value,
  Fecha: fechaActual, 
  };

  const actualizar = {
    CostoId: this.EditarID,
        Fecha: fechaActual,
    ...this.Costosform.value,
  };

console.log("Datos enviados al Banckend", guardar,actualizar);
console.log("ID que estas mandando al Banckend",this.EditarID)

if(this.EditarID && this.editar !== null){
this.http.put(`${this.apiurl}/Costos/${this.EditarID}`,actualizar).subscribe ({
  next: () => {
    alert(`Costos actualizado`);
    this.obtenerCostos();
  },
  error: (err) => {
    console.error("Error al actualizar Costos",err)
  }
  
})}
else{
  this.http.post(`${this.apiurl}/Costos`,guardar).subscribe({
    next: () => {
      alert('Costos agregado');
      this.Costosform.reset();
      this.obtenerCostos();
    }
  })
} 

  }

  editarCostos(Costo: any) {
  this.editar = true;
  this.EditarID = Costo.costoId; 

  this.Costosform.patchValue({
      LoteId: Costo.loteId,
      Monto: Costo.monto,
      Descripcion: Costo.descripcion
  });
}

  EliminarCostos(CostoID: number) {
    if (confirm('¿Desea borrar este Costos?')) {
      this.http.delete(`${this.apiurl}/Costos/${CostoID}`).subscribe({
        next: () => {
          alert('Costos Eliminado');
          this.obtenerCostos();
        },
        error: (err) => {
          console.error('Error al eliminar Costos', err);
        }
      });
    }
  }

  resetformulario() {
    this.Costosform.reset();
    this.editar = false;
    this.EditarID = null;
  }

}
