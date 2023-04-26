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
  constructor(private fb: FormBuilder, private pService: PersonaService) { 
    this.personas = new Array<Persona>();
    this.formularioPersona =fb.group({
      numDocumento: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required])
    })
  }

  //Enviar Datos para la creacion de una persona.

  enviarDatos(){
    if(this.formularioPersona.valid){
      let person = new Persona()
      person.numDocumento = this.formularioPersona.get('numDocumento')?.value
      person.nombre = this.formularioPersona.get('nombre')?.value
      person.apellido = this.formularioPersona.get('apellido')?.value
      person.email = this.formularioPersona.get('email')?.value
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

  //Eliminar Persona

  deletePersona(idPersona: number){
    this.pService.deletePersona(idPersona).subscribe(res =>{
      this.getPersonas()
    })
  }

  ngOnInit(): void {
  }

  

}
