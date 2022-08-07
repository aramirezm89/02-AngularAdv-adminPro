import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit,OnDestroy {

  intervalSubscription! : Subscription;

  constructor() {
    /*  this.retornaOBservable()
      .pipe(retry(1))
      .subscribe({
        next: (valor) => {
          console.log(valor);
        },
        error: (err) => console.warn(err),
        complete: () => console.log('termine'),
      }); */

   this.intervalSubscription = this.retornaIntervalo().subscribe({
      next: (valor) => console.log(valor),
    });


  }
  ngOnDestroy(): void {
   this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  retornaIntervalo():Observable<number>{
    return interval(500).pipe(
      map(valor => valor + 1),
      filter(valor => valor%2 ===0)
    );
  }

  retornaOBservable(): Observable<number> {
    let i: number = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 2) {
          observer.error('Valor 2 es error');
        }

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }
}
