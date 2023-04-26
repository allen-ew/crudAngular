import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  personas: Array<Persona>
  formularioPersona : FormGroup
  display: boolean

  constructor(private fb: FormBuilder, private pService: PersonaService) { 
    this.personas = new Array<Persona>();
    this.display = false;
    this.formularioPersona =fb.group({
      numDocumento: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      correoElectronico: new FormControl('',[Validators.required,Validators.email])
    })
  }

  //Enviar Datos para la creacion de una persona.

  enviarDatos(){
    if(this.formularioPersona.valid){
      let person = new Persona()
      person.numDocumento = this.formularioPersona.get('numDocumento')?.value
      person.nombre = this.formularioPersona.get('nombre')?.value
      person.apellido = this.formularioPersona.get('apellido')?.value
      person.correoElectronico = this.formularioPersona.get('correoElectronico')?.value
      this.pService.setPersonas(person).subscribe(res =>{
        this.getPersonas()
        this.formularioPersona.reset()
      })
    }
  }

  //Mostrar Personas.

  getPersonas(){
    this.pService.getPersonas().subscribe(res =>{
      this.personas = res
    })
  }

  //Actualizar una persona

  actualizarPersona(){
    if(this.formularioPersona.valid){
      let person = new Persona()
      person.numDocumento = this.formularioPersona.get('numDocumento')?.value
      person.nombre = this.formularioPersona.get('nombre')?.value
      person.apellido = this.formularioPersona.get('apellido')?.value
      person.correoElectronico = this.formularioPersona.get('correoElectronico')?.value
      this.pService.updatePersonas(person).subscribe(res =>{
        this.getPersonas()
        this.formularioPersona.reset()
        this.display = !this.display
      })
    }
  }

  //Eliminar Persona

  deletePersona(idPersona: number){
    this.pService.deletePersona(idPersona).subscribe(res =>{
      this.getPersonas()
    })
  }

  //Cambiar estado de la variable display

  activador(persona:Persona){
    this.formularioPersona.get('numDocumento')?.setValue(persona.numDocumento)
    this.formularioPersona.get('nombre')?.setValue(persona.nombre)
    this.formularioPersona.get('apellido')?.setValue(persona.apellido)
    this.formularioPersona.get('correoElectronico')?.setValue(persona.correoElectronico)
    this.display = !this.display
  }

  ngOnInit(): void {
  }

  

}
