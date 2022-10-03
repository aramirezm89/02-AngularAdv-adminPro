import { Component, DoCheck, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions() : void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {

  constructor(private settingsService : SettingsService, private sideBArService:SidebarService) {

  }

  ngOnInit(): void {
    customInitFunctions();
     this.settingsService.mainTheme();
     this.sideBArService.cargarMenu();
  }


}
