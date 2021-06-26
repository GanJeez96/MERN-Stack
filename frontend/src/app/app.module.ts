import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { UserregComponent } from './userreg/userreg.component';
import {HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyprojectsComponent } from './myprojects/myprojects.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditprojectComponent } from './editproject/editproject.component';

@NgModule({
  declarations: [
    AppComponent,
    UserregComponent,
    DashboardComponent,
    MyprojectsComponent,
    MyprofileComponent,
    EditprojectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([//
      {
        path:'',
        component: UserregComponent
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'myprojects',
        component:MyprojectsComponent
      },
      {
        path:'myprofile',
        component:MyprofileComponent
      },
      {
        path:'editproject',
        component:EditprojectComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]   //executes the app.component file
})
export class AppModule { }
