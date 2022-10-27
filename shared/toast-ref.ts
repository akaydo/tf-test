import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  constructor(private readonly overlay: OverlayRef) { }

  close() {
    this.overlay.dispose();
  }

  isVisible() {
    return this.overlay && this.overlay.overlayElement;
  }

  // получаем положение всплывающего сообщения на экране
  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect()
  }
}