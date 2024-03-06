import { Component, Inject, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  @Input()   parent: string = ""
  @Input() idUsuario: string = ""

  usersServices = inject(UsersService)

  async borrarSerie(id:string){

    let confirmacion = confirm('Seguro que quiere borrar el usuario con id' + this.idUsuario)
    if(confirmacion){
     let response = await this.usersServices.delete(id);
      if(response._id){
        console.log(response)
           alert('se ha borrado corrctamente el usuario:   '  + response.username)
      }
    }
    else{
      
    }



  }
}
