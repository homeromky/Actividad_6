import { Component, inject} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  usersServices = inject(UsersService)
  arrUsers: IUsuario[] = []


  ngOnInit(): void {
    this.usersServices.getAll().subscribe(
      (data:IUsuario[] ) => {
        

        this.arrUsers = data;


      },
      (error) => {
        console.error('Error al obtener los nombres de usuario:', error);
      }
    );
  }
}
