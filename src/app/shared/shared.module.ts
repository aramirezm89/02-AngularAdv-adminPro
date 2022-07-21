import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BreadCrumbsComponent, SidebarComponent, HeaderComponent],
  exports: [BreadCrumbsComponent, SidebarComponent, HeaderComponent],
})
export class SharedModule {}
