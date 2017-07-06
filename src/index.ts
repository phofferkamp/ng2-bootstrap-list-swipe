import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { hammerjs } from 'hammerjs';
(window as any).hammerjs = hammerjs;

import { Bs3SwipeDirective } from './bs3-directive';
import { Bs4SwipeDirective } from './bs4-directive';
import { Service } from './service';

export * from './bs3-directive';
export * from './service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Bs3SwipeDirective,
    Bs4SwipeDirective
  ],
  exports: [
    Bs3SwipeDirective,
    Bs4SwipeDirective
  ]
})
export class SwipeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SwipeModule,
      providers: [Service]
    };
  }
}
