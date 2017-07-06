import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Service {

  private _newId = -1;
  dispatcher: EventEmitter<any> = new EventEmitter();

  constructor() { }

  getNewId() {
    this._newId++;
    return this._newId;
  }

  emitMessageEvent(id: number) {
    this.dispatcher.emit(id);
  }

  getEmitter() {
    return this.dispatcher;
  }

}
