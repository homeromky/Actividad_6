import { Component, inject} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { IResponse } from '../../interfaces/iresponse .interface';
import {NgxPaginationModule} from 'ngx-pagination'
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent,RouterLink,NgxPaginationModule,NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  usersServices = inject(UsersService)
  arrUsers: IUsuario[] = [];


  total_page: number | undefined;
  page: number | undefined;
  per_page: number | undefined;
  total: number | undefined
  
 
  async ngOnInit(): Promise<void> {
    // try{
    //    await this.usersServices.getAll().then((res)=>{
    //     this.arrUsers = res.results

    //     console.log(this.arrUsers)
    //   },
    //   (error) => {
    //       console.error('Error:', error);
    //   });
      
    //  }
    //  catch(error){
    //   console.error('Error al obtener los nombres de usuario:', error);
    //  }
    
    this.usersServices.getUsers().subscribe(
      (data:any ) => {
            this.arrUsers = data.results;
            this.total_page = data.total_page;
            this.page = data.page;
            this.per_page= data.per_page;
            this.total = data.total;
       },
      (error) => {
        console.error('Error al obtener los nombres de usuario:', error);
      }
    ); 
  }

  getTotalPages(): number {
    return Math.ceil(Number(this.total) / Number(this.per_page));
  }
}
