import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from 'shared/toast-config';

@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    OverlayModule,
    MatIconModule
  ]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: { ...defaultToastConfig, ...config },
        },
      ],
    };
  }
}