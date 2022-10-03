import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BreadCrumbsComponent, SidebarComponent, HeaderComponent, FooterComponent],
  imports:[CommonModule,RouterModule,FormsModule],
  exports: [BreadCrumbsComponent, SidebarComponent, HeaderComponent,FooterComponent],
})
export class SharedModule {}
