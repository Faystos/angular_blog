import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from './../app-routing.module';
import { AuthService } from './../admin/shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    RouterModule,
    CommonModule
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    HeaderComponent
  ],
  providers: [
    AuthService,

  ],
})

export class SharedModule {}
