import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Clientes } from '../models/clientes';
import { ApiClienteService } from '../services/api-cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  lstCliente: any;
  dtOptions: DataTables.Settings = {};
  cliente: Clientes = {} as Clientes;
  crearCliente: boolean = false;
  btnEditar: boolean = false;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiCliente: ApiClienteService) { }
  formulario = this.formBuilder.group({
    Direccion: ['', Validators.required],
    Telefono: ['', Validators.required],
    Nombre: ['', Validators.required],
    Correo: ['', Validators.required],
    NroDNI: ['', Validators.required],
    FechaNacimiento: ['', Validators.required],
    FechaInscripcion: ['', Validators.required],
    TemaInteres: ['', Validators.required],
    Estado: ['', Validators.required]
  })
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10

    };
    this.GetCliente();
  }

  get f() {
    return this.formulario.controls  //Se le coloca un alias al formulario(f)
  }

  verClientes() {
    this.btnEditar = false;
    this.crearCliente = true;
    this.borrarFormulario();
  }


  borrarFormulario() {
    this.formulario.reset();
  }
  GetCliente() {
    this.apiCliente.GetCliente().subscribe(response => {
      this.lstCliente = response.datos;
    })
  }

  AddCliente() {

    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    Swal.fire({

      title: 'Cliente',
      text: '¿Deseas guardar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

        this.cliente = Object.assign(this.cliente, this.formulario.value);
        console.log(this.cliente);
        this.apiCliente.addCliente(this.cliente).subscribe(response => {
          if (response.exito == 0) {
            console.log(response.mensaje);
            return;
          }
          Swal.fire({

            title: 'Cliente',
            text: 'Cliente guardado',
            icon: 'success',
            showCancelButton: false
  
          })
          this.GetCliente();
        })
       
      }
    }
    )

  }
  editCliente(oCliente: Clientes) {
    this.formulario.controls.Direccion.setValue(oCliente.direccion)
    this.formulario.controls.Telefono.setValue(oCliente.telefono)
    this.formulario.controls.Nombre.setValue(oCliente.nombre)
    this.formulario.controls.Correo.setValue(oCliente.correo)
    this.formulario.controls.NroDNI.setValue(oCliente.nroDni)
    this.formulario.controls.FechaNacimiento.setValue(oCliente.fechaNacimiento)
    this.formulario.controls.FechaInscripcion.setValue(oCliente.fechaInscripcion)
    this.formulario.controls.TemaInteres.setValue(oCliente.temaInteres)
    this.formulario.controls.Estado.setValue(oCliente.estado)
    this.crearCliente = true;
    this.cliente.id = oCliente.id;
    this.btnEditar = true;
  }
  updateCliente() {
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    this.apiCliente.updateCliente(this.cliente).subscribe(response => {
      if (response.exito == 0) {
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCliente();
    })
  }

  desactivarCliente(cliente: Clientes) {
    this.apiCliente.desactivarCliente(cliente.id).subscribe(response => {
      if (response.exito == 0) {
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCliente();

    }
    )

  }
}
