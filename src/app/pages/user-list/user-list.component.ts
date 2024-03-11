import { Component, inject} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  usersServices = inject(UsersService)
  arrUsers: IUsuario[] = []


  ngOnInit(): void {
    this.usersServices.getUsers().subscribe(
      (data:any ) => {
           this.arrUsers = data.results; 
      },
      (error) => {
        console.error('Error al obtener los nombres de usuario:', error);
      }
    );
  }
}
