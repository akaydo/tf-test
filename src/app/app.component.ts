import { Component } from '@angular/core';
import { BehaviorSubject, concatMap, delay, first, from, of, skip } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private counter = new BehaviorSubject<number>(0);
  counter$ = this.counter.asObservable();

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.getCountValue();
  }

  incrementCounter(): void {
    const { value: currentCounterValue } = this.counter;
    this.counter.next(currentCounterValue + 1);
  }

  showCounter() {
    this.incrementCounter();
  }

  showToast(value: number) {
    this.toastService.show({
      text: `Счетчик: ${value}`,
      type: 'info',
    });
  }

  getCountValue() {
    from(this.counter$)
      .pipe(
        skip(1),
        concatMap(value => {
          return of(value).pipe(first(), delay(1000))
        })
      )
      .subscribe(res => {
        this.showToast(res);
        console.log(res);
      });
  }
}
