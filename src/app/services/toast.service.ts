import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { ToastConfig, ToastData, TOAST_CONFIG_TOKEN } from 'shared/toast-config';
import { ToastRef } from 'shared/toast-ref';
import { ToastComponent } from '../toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast!: ToastRef;

  constructor(private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) { }

  // получаем экземляр сервиса Overlay, создаем экземлпяр компонента toast и отображаем его на экране
  show(data: ToastData) {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  // стратегия создания начальной позиции 
  getPositionStrategy() {
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(this.toastConfig.position?.right + 'px');
  }

  // если есть последнее уведомление, получаем его нижнюю позицию
  getPosition() {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
      ? this.lastToast.getPosition().bottom
      : this.toastConfig.position?.top;

    return position + 'px';
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
