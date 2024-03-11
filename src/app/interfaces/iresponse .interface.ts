import { IUsuario } from "./iusuario.interface";

export interface IResponse<IUsuario> {
   page: number,
   per_page: number,
   total: number,
   total_page: number,
   result: IUsuario[];
}
