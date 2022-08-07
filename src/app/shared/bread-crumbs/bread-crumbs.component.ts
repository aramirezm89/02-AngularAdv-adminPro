import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css'],
})
export class BreadCrumbsComponent implements OnDestroy {
  tituloPagina: string = '';
  tituloPaginaSubscription$: Subscription;

  constructor(private router: Router) {

    this.tituloPaginaSubscription$ = this.getDataRuta().subscribe(
      ({ titulo }) => {
        this.tituloPagina = titulo;
        document.title = `AdminPro - ${this.tituloPagina}`;
      }
    );

  }




  ngOnDestroy(): void {
    this.tituloPaginaSubscription$.unsubscribe();
  }

  getDataRuta() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event) => event.snapshot.firstChild === null),
      map((event) => event.snapshot.data)
    );
  }




}
