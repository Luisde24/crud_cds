import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cds } from '../models/cds';
import { ApiCdsService } from '../services/api-cds.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.css']
})
export class CdsComponent implements OnInit {
  lstCds: any;
  dtOptions: DataTables.Settings = {};
  cds: Cds = {} as Cds;
  crearCds: boolean = false;
  btnEditar: boolean = false;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiCds: ApiCdsService) { }
  formulario = this.formBuilder.group({
    CodigoTitulo: ['', Validators.required],
    NoCd: ['', Validators.required],
    Condicion: ['', Validators.required],
    Ubicacion: ['', Validators.required]
  })

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetCds();
  }

  get f() {
    return this.formulario.controls  //Se le coloca un alias al formulario(f)
  }

  GetCds() {

    this.apiCds.GetCds().subscribe(response => {
      this.lstCds = response.datos;
    })
  }

  verCds() {
    this.btnEditar = false;
    this.crearCds = true;
    this.borrarFormularioCds();
  }

  AddCds() 
  {

    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    Swal.fire({

      title: 'Cds',
      text: '¿Deseas guardar un Cd?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

        this.cds = Object.assign(this.cds, this.formulario.value);
        console.log(this.cds);
        this.apiCds.addCds(this.cds).subscribe(response => {
          if (response.exito == 0) {
            console.log(response.mensaje);
            return;
          }
          Swal.fire({

            title: 'Cds',
            text: 'Cd guardado',
            icon: 'success',
            showCancelButton: false

          })
          this.GetCds();
        })

      }
    }
    )
  }

  editCds(oCds: Cds) {
    this.formulario.controls.CodigoTitulo.setValue(oCds.codigoTitulo)
    this.formulario.controls.NoCd.setValue(oCds.noCd)
    this.formulario.controls.Condicion.setValue(oCds.condicion)
    this.formulario.controls.Ubicacion.setValue(oCds.ubicacion)
    this.crearCds = true;
    this.cds.id = oCds.id;
    this.btnEditar = true;
 
  }

  updateCds() {
    this.cds = Object.assign(this.cds, this.formulario.value);
    this.apiCds.updateCds(this.cds).subscribe(response => {
      if (response.exito == 0) {
        console.log(response.mensaje);
        return;
      }
      Swal.fire({

        title: 'Cds',
        text: 'Cd Actualizado',
        icon: 'success',
        showCancelButton: false
  
      })
      this.GetCds();
    })
  }

  borrarFormularioCds() {
    this.formulario.reset();
  }


  desactivarCds(cds: Cds) {
    this.apiCds.desactivarCds(cds.id).subscribe(response => {
      if (response.exito == 0) {
        console.log(response.mensaje);
        return;
      }
      Swal.fire({

        title: 'Cds',
        text: 'Cd Desabilitado',
        icon: 'success',
        showCancelButton: false

      })
      this.GetCds();

    }
    )

  }


}
