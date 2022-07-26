import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  el: HTMLAnchorElement = document.querySelector('#theme')!;
  constructor() {}

  ngOnInit(): void {

  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.el.href = url;

    localStorage.setItem('theme', url);
  }
}