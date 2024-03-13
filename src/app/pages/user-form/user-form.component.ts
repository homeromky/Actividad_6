import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
 tipo: string = 'Nuevo';
 boton: string = 'Guardar';
 usuarioForm: FormGroup;
 activatedRout = inject(ActivatedRoute)
 router = inject(Router)
 usuarioService = inject(UsersService)

 constructor(){

  this.usuarioForm = new FormGroup({
    _id: new FormControl('',[]),
    id: new FormControl('',[]),
    first_name: new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    last_name: new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    username: new FormControl(null,[]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      
    ]),
    image: new FormControl(null,[
      Validators.required,
    ]),
    password: new FormControl(null,[]),
    
  },[])
 }

 ngOnInit(){
  
  this.activatedRout.params.subscribe(async (params: any)=>
  {
    if(params.id){
    this.tipo = 'Actualizar'
    this.boton = 'Actualizar'
    const response = await this. usuarioService.getById(params.id)

    this.usuarioForm.setValue(response)

    this.usuarioForm = new FormGroup({
       _id: new FormControl(response._id,[]),
      first_name: new FormControl(response.first_name,[]),
      last_name: new FormControl(response.last_name,[]),
      email: new FormControl(response.email,[]),
      image: new FormControl(response.image,[]),
      
    },[])
    }
  })

 }
async getDataForm(){

  if(this.usuarioForm.value._id){
     const response = await this.usuarioService.update(this.usuarioForm.value)
     console.log(response)

     if(response.id)
     {
      alert(`El usuario ${response.username} se ha actualizado correctaemnte`)
      this.router.navigate(['/usuarios'])
     }
     else{
      alert('Ha habido un problema intentalo nuevamente')
    }
  }
  else{
    const response = await this.usuarioService.insert(this.usuarioForm.value)
    if(response.id)
    {
      console.log(response)
      this.router.navigate(['/usuarios'])
    }
    else{
      alert('Ha habido un problema intentalo nuevamente')
    }
  }
}
validarControl(formControlName: string, validador: string): boolean | undefined {

  return this.usuarioForm.get(formControlName)?.hasError(validador) && this.usuarioForm.get(formControlName)?.touched
}
  
}


