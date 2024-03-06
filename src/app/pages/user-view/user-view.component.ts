import { Component, inject } from '@angular/core';
import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  activatedRoute = inject(ActivatedRoute)
  unUsuario!: IUsuario;

  usuarioService = inject(UsersService)

  ngOnInit() : void{
    this.activatedRoute.params.subscribe(async (param: any) =>{
      const id = param.id;
      try{
        this.unUsuario = await this.usuarioService.getById(id);
      }catch(error){
        console.log(error)
      }
    })
  }
}
