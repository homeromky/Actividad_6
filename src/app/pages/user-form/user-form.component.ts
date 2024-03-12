import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
 usuarioForm: FormGroup;
 activatedRout = inject(ActivatedRoute)
 router = inject(Router)
 usuarioService = inject(UsersService)

 constructor(){

  this.usuarioForm = new FormGroup({
    _id: new FormControl('',[]),
    id: new FormControl('',[]),
    first_name: new FormControl('',[]),
    last_name: new FormControl('',[]),
    username: new FormControl('',[]),
    email: new FormControl('',[]),
    image: new FormControl('',[]),
    password: new FormControl('',[]),
    
  },[])
 }

 ngOnInit(){
  
  this.activatedRout.params.subscribe(async (params: any)=>
  {
    if(params.id){
    this.tipo = 'Actualizar'
    const response = await this. usuarioService.getById(params.id)

console.log(response)


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




}
  
}


