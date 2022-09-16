import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NotPageFoundComponent],
  imports: [
    AppRoutingModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
