import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { InfoComponent } from './info/info.component';
import {MedicaldeclarationComponent} from './medicaldeclaration/medicaldeclaration.component';
import {SignupComponent} from './signup/signup.component';
import {ElectivemodulesComponent} from './electivemodules/electivemodules.component';

import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
{ path: 'register', component:RegisterComponent},
{ path: 'login', component:LoginComponent},
{ path: 'logout', component:LogoutComponent},
{ path: 'home', component:HomeComponent,  canActivate: [AuthGuard], data: { permission: { only: ["Student", "Admin"] } }},
{ path: 'about', component:AboutComponent,  canActivate: [AuthGuard], data: { permission: { only: ["Student", "Admin"] } } }, 
{ path: 'account/:email', component:AccountComponent,  canActivate: [AuthGuard], data: { permission: { only: ["Student", "Admin"] } }},
{ path: 'info/:id', component:InfoComponent},
{ path: 'medicaldeclaration', component:MedicaldeclarationComponent, canActivate: [AuthGuard], data: { permission: { only: ["Student", "Admin"] } }},
{ path: 'signup', component:SignupComponent, canActivate: [AuthGuard], data: { permission: { only: ["Student", "Admin"] } }},
{ path: 'electivemodules', component:ElectivemodulesComponent, canActivate: [AuthGuard], data: {permission: {only: ["Student", "Admin"] } }},
{ path: 'admin', component:AdminComponent, canActivate: [AuthGuard], data: {permission: {only: ["Admin"] } }},
{ path: '', component:LoginComponent, pathMatch:'full'}

];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);