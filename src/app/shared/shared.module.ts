import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BreadCrumbsComponent, SidebarComponent, HeaderComponent, FooterComponent],
  imports:[CommonModule,RouterModule],
  exports: [BreadCrumbsComponent, SidebarComponent, HeaderComponent,FooterComponent],
})
export class SharedModule {}
