import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    {path: "", pathMatch:"full", redirectTo:"usuarios"},
    {path:'usuarios', component:UserListComponent },
    {path:'usuario/:id', component:UserViewComponent},
    {path:"new/usuario", component: UserFormComponent},
    {path:"update/usuario/:id", component:UserFormComponent }

];
