import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
httpClient = inject(HttpClient)
baseUrl = 'https://peticiones.online/api/users'

//observables: son las formas nativas como angular hace la petciones externas, Algo que se mantiene atento a lo cambios que pueda sufrir los datos
getAll(): Observable<IUsuario[]>
{
  return this.httpClient.get<IUsuario[]>(this.baseUrl).pipe(
    map((response: any) => response.results)
  );
}

//Promises
getAllPromises() : Promise<IUsuario[]>
{
  return lastValueFrom(this.httpClient.get<IUsuario[]>(this.baseUrl))
}

getById(id:string) : Promise<IUsuario>
{
  const url = `${this.baseUrl}/${id}`;
  return lastValueFrom(this.httpClient.get<IUsuario>(url))
}

delete(id:string) : Promise<IUsuario>
{
  const url = `${this.baseUrl}/${id}`;
  return lastValueFrom(this.httpClient.delete<IUsuario>(url))
}
}
