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
      atrNumDocumento: new FormControl('',[Validators.required]),
      atrNombre: new FormControl('',[Validators.required]),
      atrApellido: new FormControl('',[Validators.required]),
      atrEmail: new FormControl('',[Validators.required])
    })
  }

  //Enviar Datos para la creacion de una persona.

  enviarDatos(){
    if(this.formularioPersona.valid){
      let person = new Persona()
      person.atrNumDocumento = this.formularioPersona.get('atrNumDocumento')?.value
      person.atrNombre = this.formularioPersona.get('atrNombre')?.value
      person.atrApellido = this.formularioPersona.get('atrApellido')?.value
      person.atrEmail = this.formularioPersona.get('atrEmail')?.value
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
