import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { AgmCoreModule } from '@agm/core';

//angular mat
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatDialogModule} from "@angular/material"
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { routing } from './app.routing';
import { AuthService } from './auth.service';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { InfoComponent } from './info/info.component';
import { MedicaldeclarationComponent } from './medicaldeclaration/medicaldeclaration.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ElectivemodulesComponent } from './electivemodules/electivemodules.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    AccountComponent,
    InfoComponent,
    MedicaldeclarationComponent,
    SignupComponent,
    AdminComponent,
    ElectivemodulesComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    NgbModule,

    //angular mat
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatListModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
