import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent {
 sociosform: FormGroup;
  socios: any[] = [];
  sociosFiltrados: any[] = [];
  searchInput: string = '';
  private apiurl = enviroment.api_url;
  editar: boolean = false;
  EditarID: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.sociosform = this.fb.group({
      PorcentajeGanancia: [0, [Validators.required,Validators.min(0)]],
      Nombre: ['', [Validators.required]],
      Rol: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.obtenersocios();
  }

  obtenersocios() {
    this.http.get<any[]>(`${this.apiurl}/socios`).subscribe({
      next: (data) => {
        this.socios = data;
        this.sociosFiltrados = data;
        console.log('socioss cargados:', this.socios);
      },
      error: (err) => {
        console.error('Error al obtener los socioss', err);
      }
    });
  }  

buscarsocios() {
  const texto = this.searchInput.trim().toLowerCase();
  if (!texto) {
    this.sociosFiltrados = [...this.socios];
  } else {
    this.sociosFiltrados = this.socios.filter(p =>
      p.idsocios.toString().toLowerCase().includes(texto)
    );
  }
}
  limpiarBusqueda() {
  this.searchInput = '';
  this.sociosFiltrados = [...this.socios];
}

  guardarsocios() {
   if (this.sociosform.invalid) {alert('Falta un dato')
    return;
   } ;


  const fechaActual = new Date().toISOString(); // Fecha en formato ISO

  const guardar = {
  ...this.sociosform.value,
  Fecha: fechaActual, 
  };

  const actualizar = {
    SocioId: this.EditarID,
        Fecha: fechaActual,
    ...this.sociosform.value,
  };

console.log("Datos enviados al Banckend", guardar,actualizar);
console.log("ID que estas mandando al Banckend",this.EditarID)

if(this.EditarID && this.editar != null){
this.http.put(`${this.apiurl}/socios/${this.EditarID}`,actualizar).subscribe ({
  next: () => {
    alert(`socios actualizado`);
    this.obtenersocios();
  },
  error: (err) => {
    console.error("Error al actualizar socios",err)
  }
  
})}
else{
  this.http.post(`${this.apiurl}/socios`,guardar).subscribe({
    next: () => {
      alert('socios agregado');
      this.sociosform.reset();
      this.obtenersocios();
    }
  })
} 

  }

  editarsocios(socio: any) {
  this.editar = true;
  this.EditarID = socio.socioId; 

  this.sociosform.patchValue({
      PorcentajeGanancia: socio.porcentajeGanancia,
      Nombre: socio.nombre,
      Rol: socio.rol
  });
}

  Eliminarsocios(SocioId: number) {
    if (confirm('¿Desea borrar este socios?')) {
      this.http.delete(`${this.apiurl}/socios/${SocioId}`).subscribe({
        next: () => {
          alert('socios Eliminado');
          this.obtenersocios();
        },
        error: (err) => {
          console.error('Error al eliminar socios', err);
        }
      });
    }
  }

  resetformulario() {
    this.sociosform.reset();
    this.editar = false;
    this.EditarID = null;
  }

}
