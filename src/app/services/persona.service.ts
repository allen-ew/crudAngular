import { Injectable } from '@angular/core';
import { Persona } from '../models/Persona';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  varRutaGlobal = 'https://localhost:8080/persona';

  constructor(private http: HttpClient) { }

  //Create a new Persona
  setPersonas(persona:Persona){
    return this.http.post<Persona>(this.varRutaGlobal + 'nuevo', persona,{
      observe: 'response'
    })
  }
  //Read a Persona

  getPersonas(){
    return this.http.get<Persona[]>(this.varRutaGlobal + 'mostar');
  }


  //Update a Persona

  updatePersonas(persona: Persona){
    
    return this.http.post<Persona>(this.varRutaGlobal + 'update',persona,{
      observe: 'response'
    })
  }

  //Delete a Persona
  deletePersona(numDocumento: number){
    return this.http.post<Boolean>(this.varRutaGlobal + numDocumento,{
      observe: 'response'
    })
  }
}