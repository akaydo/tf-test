import { Component } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
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

  incrementCounter(): void {
    const { value: currentCounterValue } = this.counter;
    this.counter.next(currentCounterValue + 1);
  }

  showCounter() {
    this.incrementCounter();
    this.getCountValue();
  }

  showToast(value: number) {
    this.toastService.show({
      text: `Счетчик: ${value}`,
      type: 'info',
    });
  }

  getCountValue() {
    this.counter$.pipe(first()).subscribe((res) => {
      this.showToast(res);
    });
  }
}
