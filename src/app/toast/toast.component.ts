import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { toastAnimations, ToastAnimationState } from 'shared/toast-animations';
import { ToastConfig, ToastData, TOAST_CONFIG_TOKEN } from 'shared/toast-config';
import { ToastRef } from 'shared/toast-ref';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  iconType!: string;

  private intervalId?: ReturnType<typeof setTimeout>;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {
    this.iconType = data.type === 'success' ? 'done' : data.type;
  }

  // автоматически скрываем уведомление
  ngOnInit(): void {
    this.intervalId = setTimeout(() => (this.animationState = 'closing'), 500);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  // анимация скрытия уведомления при его закрытии 
  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
