import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';
import { IResponse } from '../interfaces/iresponse .interface';


@Injectable({
  providedIn: 'root'
})


export class UsersService {
private httpClient = inject(HttpClient)
private baseUrl = 'https://peticiones.online/api/users'



// getUsers(): Promise<any>
// {
//   return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
// }

getUsers(): Observable<IResponse<IUsuario>> {
  return this.httpClient.get<IResponse<IUsuario>>(this.baseUrl);
}
getById(id:string) : Promise<IUsuario>
{
  const url = `${this.baseUrl}/${id}`;
  return lastValueFrom(this.httpClient.get<IUsuario>(url));
}

delete(id:string) : Promise<IUsuario>
{
  const url = `${this.baseUrl}/${id}`;
  const respose = lastValueFrom(this.httpClient.delete<IUsuario>(url))
  
  return respose;
}
update(formValue: IUsuario) : Promise<IUsuario>
{
  const url = `${this.baseUrl}/${formValue._id}`;
  return lastValueFrom(this.httpClient.put<IUsuario>(url,formValue))
}

insert(formValue: IUsuario) : Promise<IUsuario>
{

  let arrusename = formValue.email.split('');
  let username: string = ""
  for (var val of arrusename) {
    if(val === '@'){
      break;
    }
    else{
      username += val
    }
  }
  formValue.username = username;
 
 return lastValueFrom(this.httpClient.post<IUsuario>(this.baseUrl, formValue))
}

}


